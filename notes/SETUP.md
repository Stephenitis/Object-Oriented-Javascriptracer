------------------------------------------------
Bash
- ps auxww | grep ruby
- rake db:drop; rake db:create; rake db:migrate; shotgun

------------------------------------------------
# Requirements
- A page that lists all the categories
- A page that lists all the postings in a given category
- A page that lets someone create a new posting in a given category
- A page that lets someone who has created a page return to edit/update the page

- A price, probably. 
- An email, Title, description, etc.
- Spend time enumerating the pages, deciding what should be displayed on each one.
------------------------------------------------
# Models
User
  has_many :posts

Post
  belongs_to :category
  belongs_to :user

Category
  has_many :posts

------------------------------------------------
# Schema

Users
  id  user_name
  1   Adam
  2   Jkai
  3   Rober


Posts
  id  post_title        category_id  user_id
  1   Adam's Apt        1             1
  2   Sell Honda Civic  3             1
  3   Sell computer     2             2
  3   Sell Macbook      2             3


Categories
  id  category_name
  1   Rental 
  2   Electronics 
  3   Autombile 

------------------------------------------------
# Steps
  1 $ bundle
  
  2 $ rake db:create
  
  3 $ rake generate:migration NAME=create_users
    $ rake generate:migration NAME=create_posts
    $ rake generate:migration NAME=create_categories
  
  4 Modify db/migrate/ files
    create_table :users
    create_table :posts
    create_table :categories

  5 $ rake db:migrate
  
  6 $ rake generate:model NAME=User
    $ rake generate:model NAME=Post
    $ rake generate:model NAME=Category

  7 Modify app/models/ files
    added to category.rb - has_many :posts
    added to post.rb - belongs_to :category, :user
    added to user.rb - has_many :posts

  8 Modify db/seeds.rb

  9 rake db:seed
    *note: require 'faker'
            modify config/environment.rb
              add Dir[APP_ROOT.join('app', 'models', '*.rb')]...
              add Dir[APP_ROOT.join('app', 'views', '*.rb')]...
            modify config/database.rb
              add Dir[APP_ROOT.join('app', 'views', '*.rb')]...
              add Dir[APP_ROOT.join('app', 'controllers', '*.rb')]...

  10 psql craigslist_jr_development
     *note: check tables \dt
            check data
            SELECT * FROM posts a INNER JOIN users b ON a.user_id = b.id INNER JOIN categories c ON a.category_id = c.id where a.user_id = 49;

  11 rake console
     *note: Create data in ActiveRecord
     >  p = Post.last
        *assign p to the last Post
     >  User.first.posts
        *get post from user_id = 1
     >  User.first.posts << p
        *assign last post to user_id = 1

  12 Making Routes
      *note:



      get *make a query, hitting 'enter'
      post *create something new, submit a form
      put *update, submit a form
      delete *destroy

 View Servers Running
 ps auxww | grep ruby

------------------------------------------------

Goal:
- Create URL shortner
- URL that redirects us to the full (unshortened) URL


Requirements:
- shorten url

- counter
  * click_count
    - keeps track of how many times someone has visited the shortened URL. 
    - Add code to the appropriate place in your controller code
    -  any time someone hits the URL the counter increments by 1.

- validations
  * only valid urls can be saved

  * valid urls
    - Any non-empty string
    - Any non-empty string that starts with "http://" or "https://"
    - Any string that the Ruby URI module says is valid
    - Any URL-looking thing which responds to a HTTP request

  * error handling
    - not valid url: tell user the url is not valid


Database table 
  * URL
  ------
    -id
    -full_url
    -shorten_url
    -click_count**

Url Model
  * Validations
    - regex for full_url
    - presence => true

  * Methods
    - method that shortens full_url


Url Controller
  * get / 
    - input the full url to be shortened
    - display shortened url back to user

  * post /urls
    - takes the full url
    - adds url to database
    - creates a shortened url
    - redirects back to /

    errors**
    - if url is not valid, return errors to /

  * get /:short_url
    - short_url links to href for full url


Url Views
  * looks like google
  * if successful => display short url under the input box
  * else => display error under the input box**

