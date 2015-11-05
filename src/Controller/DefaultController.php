<?php

namespace Controller;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller {

    public function indexAction()
    {
        return $this->render("Default/index.html.twig");
    }
}
