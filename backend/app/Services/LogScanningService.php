<?php

namespace App\Services;

use App\Models\CareLog;
use Illuminate\Support\Str;

class LogScanningService
{
    protected array $keywords = [
        'bất thường',
        'ốm',
        'bệnh',
        'mệt',
        'bỏ ăn',
        'nôn',
        'tiêu chảy',
        'máu',
        'thương',
        'đau',
    ];

    public function scan(CareLog $log): void
    {
        $content = Str::lower($log->content);

        foreach ($this->keywords as $keyword) {
            if (Str::contains($content, $keyword)) {
                $this->triggerScreening($log);
                break;
            }
        }
    }

    protected function triggerScreening(CareLog $log): void
    {
        $profile = $log->petProfile;
        
        try {
            // Only trigger if in QUARANTINE (as per requirement HĐ8)
            if ($profile && $profile->status === 'QUARANTINE') {
                $profile->transitionTo('SCREENING', "Auto-triggered by CareLog ID: {$log->id} due to detected keywords.");
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error("Keyword Screening Trigger Failed for Log ID {$log->id}: " . $e->getMessage());
            // Do not re-throw as this is an observer/background-ish action
        }
    }
}
