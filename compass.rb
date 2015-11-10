require 'compass/import-once/activate'
# Require any additional compass plugins here.
# Currently none.

# Symfony Paths
http_path = "/"
cache_path = "app/cache/sass"
css_dir = "web/css"
sass_dir = "web/sass"
scss_dir = 'web/sass'
images_dir = "web/images"
javascripts_dir = "web/js/src"
fonts_dir = 'web/fonts'

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true
# sprite_engine = :oily_png

add_import_path "web/bower/angular-material", "web/bower/"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
