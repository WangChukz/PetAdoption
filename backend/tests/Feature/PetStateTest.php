<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Pet;
use App\Models\PetProfile;
use App\Models\User;
use App\Models\CareLog;

class PetStateTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected Pet $pet;
    protected PetProfile $profile;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['role' => 'staff']);
        $this->actingAs($this->user);

        $this->pet = Pet::create([
            'name' => 'Test Pet',
            'species' => 'Dog',
        ]);

        $this->profile = PetProfile::create([
            'pet_id' => $this->pet->id,
            'status' => 'INTAKE',
        ]);
    }

    public function test_initial_state_is_intake()
    {
        $this->assertEquals('INTAKE', $this->profile->status);
    }

    public function test_valid_transition_intake_to_screening()
    {
        $this->profile->transitionTo('SCREENING');
        $this->assertEquals('SCREENING', $this->profile->refresh()->status);
        $this->assertDatabaseHas('audit_trails', [
            'auditable_id' => $this->profile->id,
            'new_status' => 'SCREENING',
        ]);
    }

    public function test_invalid_transition_throws_exception()
    {
        $this->expectException(\Exception::class);
        $this->profile->transitionTo('AVAILABLE');
    }

    public function test_keyword_scanner_triggers_screening()
    {
        $this->profile->transitionTo('SCREENING');
        $this->profile->transitionTo('QUARANTINE');
        $this->assertEquals('QUARANTINE', $this->profile->refresh()->status);

        CareLog::create([
            'pet_profile_id' => $this->profile->id,
            'user_id' => $this->user->id,
            'content' => 'Thú cưng có dấu hiệu bất thường, bỏ ăn.',
            'type' => 'general',
        ]);

        $this->assertEquals('SCREENING', $this->profile->refresh()->status);
    }

    public function test_auto_transition_on_vaccination_and_neutering()
    {
        $this->profile->transitionTo('SCREENING');
        $this->profile->transitionTo('QUARANTINE');

        $this->profile->update([
            'is_vaccinated' => true,
            'is_neutered' => true,
        ]);

        $this->assertEquals('READY_FOR_REVIEW', $this->profile->refresh()->status);
    }
}
