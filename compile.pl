#!/usr/bin/perl
use strict;
use WWW::Mechanize;
use HTML::TreeBuilder;
use File::Slurp;
use utf8;

my @files = ( "index", "activities/make", "activities/control", "activities/configuration" );

for my $file ( @files ){

    # Get the template file
    my $template = read_file("src/templates/fabrica/" . $file . ".tpl");

    # Remove mocks
    $template =~ s/<!--removeIf.*-->(.|\n)*<!--endRemoveIf.*-->//s;

    # Find and replace 
    my @replaced;
    for my $to_replace ( split("\n", $template) ){
        if( $to_replace =~ m{script.*(static|src)} ){
            my $url = HTML::TreeBuilder->new_from_content( $to_replace )->look_down( _tag => "script", src => qr/(static|src)/ )->attr("src");
            print "found '$url'\n";
            push @replaced, "<script type='text/javascript'>\n" . read_file("$url") . "\n</script>\n";
        }elsif( $to_replace =~ m{link.*static.*stylesheet} ){
            my $element = HTML::TreeBuilder->new_from_content( $to_replace )->look_down( _tag => "link", href => qr/static/ );
            my $url = $element->attr("href");
            print "found '$url'\n";
            push @replaced, "<style rel='" . $element->attr("rel") . "'>\n" . read_file("$url") . "\n</style>\n";
        }elsif( $to_replace =~ m/\@\@include\('(.*html)/ ){
            my $url = $1;
            print "found '$url'\n";
            push @replaced, "\n" . read_file("$url") . "\n";
        }else{
            push @replaced, $to_replace;
        }
    }

    # Generate new file
    write_file( 'compiled/' . $file . '.html', join("\r\n", @replaced) );

    #system("python smoothie-upload.py compiled/" . $file . ".html 192.168.0.15");

}


