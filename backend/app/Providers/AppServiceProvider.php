<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\Mailer\Bridge\Sendgrid\Transport\SendgridApiTransportFactory;
use Symfony\Component\Mailer\Transport\Dsn;
use Symfony\Component\HttpClient\HttpClient;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Mail::extend('sendgrid', function (array $config) {
            return (new SendgridApiTransportFactory(HttpClient::create()))->create(
                new Dsn('sendgrid+api', 'default', $config['key'])
            );
        });
    }
}
