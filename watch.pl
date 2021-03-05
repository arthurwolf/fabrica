#!/usr/bin/perl
use strict;
use File::Monitor;

my $monitor = File::Monitor->new();

# watch a directory
$monitor->watch( {
    name        => '.',
    recurse     => 1,
    callback    => 
        sub {
            my ($name, $event, $change) = @_;
            system("perl compile.pl"); 
        }
} );

while(1){
    $monitor->scan;
}
