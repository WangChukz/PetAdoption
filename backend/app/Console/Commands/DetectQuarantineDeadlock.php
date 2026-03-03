<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\PetProfile;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class DetectQuarantineDeadlock extends Command
{
    protected $signature = 'pet:detect-deadlock';
    protected $description = 'Detect pets in QUARANTINE for more than 14 days without medical updates.';

    public function handle()
    {
        $deadlockedProfiles = PetProfile::where('status', 'QUARANTINE')
            ->where('updated_at', '<', Carbon::now()->subDays(14))
            ->get();

        foreach ($deadlockedProfiles as $profile) {
            $this->warn("Deadlock detected for Pet Profile UUID: {$profile->uuid}. No updates since {$profile->updated_at}");
            Log::channel('stderr')->warning("QUARANTINE Deadlock: Pet {$profile->pet_id} (UUID: {$profile->uuid}) stagnant for 14+ days.");
            
            // Optionally notify admin or trigger a task
        }

        $this->info("Deadlock detection completed. Found " . $deadlockedProfiles->count() . " cases.");
    }
}
