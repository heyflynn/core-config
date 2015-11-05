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
        $parameters = $this->loader->load($resource);

        foreach ($parameters as $k => $v) {
            $pimple->offsetSet($k, $this->transformer($v));
        }
    }

    private function transformer($original)
    {
        if (!is_array($original))
            return $this->transform($original);

        $helper = [];
        foreach ($original as $key => $value)
            $helper[$key] = is_array($value)?$this->transformer($value):$this->transform($value);

        return $helper;
    }

    private function transform($value)
    {
        // transforms service values into the service
        if(is_string($value) && isset($this->pimple[$value])){
            return $this->pimple[$value];
        }
        return $value;
    }
}
