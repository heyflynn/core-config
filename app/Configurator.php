<?php

use Symfony\Component\Config\Loader\LoaderInterface;

class Configurator
{
    protected $loader;
    protected $pimple;

    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }

    public function configure(Sifoan $pimple, $resource)
    {
        $this->pimple = $pimple;
        $this->parameters = $this->loader->load($resource);

        foreach ($this->parameters as $k => $v) {
            $pimple->offsetSet($k, $this->transformer($v));
        }
    }

    private function transformer($original)
    {
        if (!is_array($original))
            return $this->transform($original);

        $this->helper = [];
        foreach ($original as $key => $value)
            $this->helper[$key] = is_array($value)?$this->transformer($value):$this->transform($value);

        return $this->helper;
    }

    private function transform($value)
    {
        // transforms service values into the service
        if(is_string($value) && isset($this->pimple[$value])){
            return $this->pimple[$value];
        }

        // post processing of the parameters.yml
        $value = preg_replace_callback('{%([a-z0-9_.]+)%}', array($this, 'parameters'), $value, -1, $count);

        return $value;
    }

    private function parameters($matches) {

        if(isset($this->helper[$matches[1]]))
            return $this->helper[$matches[1]];

        if(isset($this->parameters['parameters'][$matches[1]]))
            return $this->parameters['parameters'][$matches[1]];

        return $matches[0];
    }
}
