<?php

namespace App\Observers;

use App\Models\CareLog;
use App\Services\LogScanningService;

class CareLogObserver
{
    protected LogScanningService $scanner;

    public function __construct(LogScanningService $scanner)
    {
        $this->scanner = $scanner;
    }

    public function created(CareLog $log): void
    {
        $this->scanner->scan($log);
    }
}
