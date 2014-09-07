module Saw
  class App < Padrino::Application
    register Padrino::Mailer
    register Padrino::Helpers

    enable :sessions

    ##
    # Application configuration options.
    #
    # set :raise_errors, true       # Raise exceptions (will stop application) (default for test)
    # set :dump_errors, true        # Exception backtraces are written to STDERR (default for production/development)
    # set :show_exceptions, true    # Shows a stack trace in browser (default for development)
    # set :logging, true            # Logging in STDOUT for development and file for production (default only for development)
    # set :public_folder, 'foo/bar' # Location for static assets (default root/public)
    # set :reload, false            # Reload application files (default in development)
    # set :default_builder, 'foo'   # Set a custom form builder (default 'StandardFormBuilder')
    # set :locale_path, 'bar'       # Set path for I18n translations (default your_apps_root_path/locale)
    # disable :sessions             # Disabled sessions by default (enable if needed)
    # disable :flash                # Disables sinatra-flash (enabled by default if Sinatra::Flash is defined)
    # layout  :my_layout            # Layout can be in views/layouts/foo.ext or views/foo.ext (default :application)
    #

    #start app

    get '/' do
        #display main page
        @auth_token = session[:'csrf'].to_s #auth token for saving forms
        erb :index
    end

    post '/save' do
        #save an estimate
        save = Estimate.new(params)
        if save.save
            erb :saved
        else
            erb :not_saved
        end
        
    end

    get '/estimates' do
        #display all estimates
        @all_est = Estimate.all()
        @auth_token = session[:'csrf'].to_s #auth token for saving forms
        erb :estimates_element
    end

    delete '/estimate' do
        est_id = params[:est_id]
        Estimate.destroy_all(_id: est_id)
        erb '<div class="alert alert-success">Estimate Deleted</div>'
    end

    get '/single-estimate' do
        est_id = params[:est_id]
        @single_estimate = Estimate.where(_id: est_id)
        erb :single_estimate
    end

  end
end
