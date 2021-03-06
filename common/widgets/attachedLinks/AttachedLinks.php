<?php
/**
 * User: Kuklin Mikhail (kuklin@voyanga.com)
 * Company: Easytrip LLC
 * Date: 18.05.12
 * Time: 12:20
 */
class AttachedLinks extends CWidget
{
    public $model;

    public $attribute;

    public $assetsUrl;

    public $form;

    public function init()
    {
        if($this->assetsUrl===null)
            $this->assetsUrl = Yii::app()->getAssetManager()->publish(dirname(__FILE__).'/assets',false,-1,YII_DEBUG);
        Yii::app()->getClientScript()->registerScriptFile($this->assetsUrl.'/'.'attachedLinks.js');
    }

    public function run()
    {
        $this->render('template', array('links'=>$this->model->{$this->attribute}, 'form'=>$this->form));
    }
}
