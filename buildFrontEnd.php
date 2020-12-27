<?php
/*
Plugin Name: buildFrontEnd
Description: Plugin for build front-end(continous deployment) via github actions
Version: 1.0
Author: Grygorii Shevchenko
*/

require_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

add_action("admin_menu", "addMenu");

function addMenu()
{
  add_menu_page(
    "Build front-end",
    "Build front-end",
    "edit_posts",
    "buildFrontEnd",
    "displayPage",
    null,
    1
  );
}

function displayPage()
{
  require_once __DIR__ . '/view.php';
}


function register_my_plugin_scripts($hook)
{
  // Load only on ?page=mypluginname
  if ($hook != 'toplevel_page_buildFrontEnd') {
    return;
  }
  wp_enqueue_style(
    'buildFrontEnd',
    plugins_url('style.css', __FILE__)
  );
  wp_enqueue_script('buildFrontEnd', plugins_url('main.js', __FILE__, array(), false, true));
}

add_action('admin_enqueue_scripts', 'register_my_plugin_scripts');
