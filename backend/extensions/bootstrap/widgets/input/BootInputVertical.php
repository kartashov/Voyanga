<?php
/**
 * BootInputVertical class file.
 * @author Christoffer Niska <ChristofferNiska@gmail.com>
 * @copyright Copyright &copy; Christoffer Niska 2011-
 * @license http://www.opensource.org/licenses/bsd-license.php New BSD License
 * @package bootstrap.widgets.input
 */

Yii::import('bootstrap.widgets.input.BootInput');

/**
 * Bootstrap vertical form input widget.
 * @since 0.9.8
 */
class BootInputVertical extends BootInput
{
	/**
	 * Renders a checkbox.
	 * @return string the rendered content
	 */
	protected function checkBox()
	{
		$attribute = $this->attribute;
		echo '<label class="checkbox" for="'.$this->getAttributeId($attribute).'">';
		echo $this->form->checkBox($this->model, $this->attribute, $this->htmlOptions).PHP_EOL;
        $attr = CHtml::resolveName($this->model,$attribute); // strip off square brackets if any
		echo CHtml::activeLabel($this->model, $attribute);
		echo $this->getError().$this->getHint();
		echo '</label>';
	}

	/**
	 * Renders a list of checkboxes.
	 * @return string the rendered content
	 */
	protected function checkBoxList()
	{
		echo $this->getLabel();
		echo $this->form->checkBoxList($this->model, $this->attribute, $this->data, $this->htmlOptions);
		echo $this->getError().$this->getHint();
	}

	/**
	 * Renders a list of inline checkboxes.
	 * @return string the rendered content
	 */
	protected function checkBoxListInline()
	{
		$this->htmlOptions['inline'] = true;
		$this->checkBoxList();
	}

	/**
	 * Renders a drop down list (select).
	 * @return string the rendered content
	 */
	protected function dropDownList()
	{
		echo $this->getLabel();
		echo $this->form->dropDownList($this->model, $this->attribute, $this->data, $this->htmlOptions);
		echo $this->getError().$this->getHint();
	}

	/**
	 * Renders a file field.
	 * @return string the rendered content
	 */
	protected function fileField()
	{
		echo $this->getLabel();
		echo $this->form->fileField($this->model, $this->attribute, $this->htmlOptions);
		echo $this->getError().$this->getHint();
	}

	/**
	 * Renders a password field.
	 * @return string the rendered content
	 */
	protected function passwordField()
	{
		echo $this->getLabel();
		echo $this->getPrepend();
		echo $this->form->passwordField($this->model, $this->attribute, $this->htmlOptions);
		echo $this->getAppend();
		echo $this->getError().$this->getHint();
	}

	/**
	 * Renders a radio button.
	 * @return string the rendered content
	 */
	protected function radioButton()
	{
		$attribute = $this->attribute;
		echo '<label class="radio" for="'.CHtml::getIdByName(CHtml::resolveName($this->model, $attribute)).'">';
		echo $this->form->radioButton($this->model, $this->attribute, $this->htmlOptions).PHP_EOL;
		echo $this->model->getAttributeLabel($attribute);
		echo $this->getError().$this->getHint();
		echo '</label>';
	}

	/**
	 * Renders a list of radio buttons.
	 * @return string the rendered content
	 */
	protected function radioButtonList()
	{
		echo $this->getLabel();
		echo $this->form->radioButtonList($this->model, $this->attribute, $this->data, $this->htmlOptions);
		echo $this->getError().$this->getHint();
	}

	/**
	 * Renders a list of inline radio buttons.
	 * @return string the rendered content
	 */
	protected function radioButtonListInline()
	{
		$this->htmlOptions['inline'] = true;
		$this->radioButtonList();
	}

	/**
	 * Renders a textarea.
	 * @return string the rendered content
	 */
	protected function textArea()
	{
		echo $this->getLabel();
		echo $this->form->textArea($this->model, $this->attribute, $this->htmlOptions);
		echo $this->getError().$this->getHint();
	}

	/**
	 * Renders a text field.
	 * @return string the rendered content
	 */
	protected function textField()
	{
		echo $this->getLabel();
		echo $this->getPrepend();
		echo $this->form->textField($this->model, $this->attribute, $this->htmlOptions);
		echo $this->getAppend();
		echo $this->getError().$this->getHint();
	}

	/**
	 * Renders an uneditable field.
	 * @return string the rendered content
	 */
	protected function uneditableField()
	{
		echo $this->getLabel();
		echo CHtml::tag('span', $this->htmlOptions, $this->model->{$this->attribute});
		echo $this->getError().$this->getHint();
	}

	/**
	 * Renders a CAPTCHA.
	 * @return string the rendered content
	 */
	protected function captcha()
	{
		if (isset($this->htmlOptions['options']))
		{
			$options = $this->htmlOptions['options'];
			unset($this->htmlOptions['options']);
		}

		echo $this->getLabel().'<div class="captcha">';
		echo '<div class="widget">'.$this->widget('CCaptcha', isset($options) ? $options : array(), true).'</div>';
		echo $this->form->textField($this->model, $this->attribute, $this->htmlOptions);
		echo $this->getError().$this->getHint();
		echo '</div>';
	}

	/**
	 * Renders a datepicker field.
	 * @return string the rendered content
	 */
	protected function datepickerField()
	{
		if (isset($this->htmlOptions['options']))
		{
			$options = $this->htmlOptions['options'];
			unset($this->htmlOptions['options']);
		}

		if (isset($this->htmlOptions['events']))
		{
			$events = $this->htmlOptions['events'];
			unset($this->htmlOptions['events']);
		}

		echo $this->getLabel();
		$this->widget('bootstrap.widgets.BootDatepicker', array(
			'model'=>$this->model,
			'attribute'=>$this->attribute,
			'options'=>isset($options) ? $options : array(),
			'events'=>isset($events) ? $events : array(),
			'htmlOptions'=>$this->htmlOptions,
            'form'=>$this->form
		));
		echo $this->getError().$this->getHint();
	}

    /**
     * Renders a datepicker field.
     * @return string the rendered content
     */
    protected function timepickerField()
    {
        if (isset($this->htmlOptions['options']))
        {
            $options = $this->htmlOptions['options'];
            unset($this->htmlOptions['options']);
        }

        if (isset($this->htmlOptions['events']))
        {
            $events = $this->htmlOptions['events'];
            unset($this->htmlOptions['events']);
        }

        echo $this->getLabel();
        $this->widget('bootstrap.widgets.BootTimepicker', array(
            'model'=>$this->model,
            'attribute'=>$this->attribute,
            'options'=>isset($options) ? $options : array(),
            'events'=>isset($events) ? $events : array(),
            'htmlOptions'=>$this->htmlOptions,
            'form'=>$this->form
        ));
        echo $this->getError().$this->getHint();
    }
}