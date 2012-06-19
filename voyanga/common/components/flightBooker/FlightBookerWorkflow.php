<?php
return array(
    'initial' => 'search',
    'node' => array(
        array('id'=>'search',                   'transition'=> array(
                'enterCredentials' => 'Yii::app()->flightBooker->proccessEnterCredentials()'
        )),
        array('id'=>'enterCredentials',         'transition'=>'booking'),
        array('id'=>'booking',                  'transition'=>'waitingForPayment,bookingError'),
        array('bookingError',                   'transition'=>'error'),
        array('id'=>'waitingForPayment',        'transition'=>'payment,bookingTimeLimitError'),
        array('id'=>'bookingError',             'transition'=>'error'),
        array('id'=>'payment',	                'transition'=>'ticketing,bookingTimeLimitError'),
        array('id'=>'bookingTimeLimitError',    'transition'=>'error'),
        array('id'=>'ticketing',                'transition'=>'ticketReady,ticketingRepeat'),
        array('id'=>'ticketReady',              'transition'=>'bspTransfer'),
        array('id'=>'ticketingRepeat',          'transition'=>'ticketReady,manualProccessing'),
        array('id'=>'manualProccessing',        'transition'=>'ticketingError,manualTicketing'),
        array('id'=>'manualTicketing',          'transition'=>'manualSuccess,manualError'),
        array('id'=>'ticketingError',           'transition'=>'moneyReturn'),
        array('id'=>'manualError',              'transition'=>'moneyReturn'),
        array('id'=>'moneyReturn',              'transition'=>'error'),
        array('id'=>'manualSuccess',            'transition'=>'done'),
        array('id'=>'bspTransfer',              'transition'=>'done'),
        array('id'=>'ticketReady',              'transition'=>'done'),
    )
)
?>