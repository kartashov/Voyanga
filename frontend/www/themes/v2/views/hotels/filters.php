<script id="hotels-filters" type="text/html">
    <div class="filter-content">
        <div class="div-filter">
            <h4>Название</h4>
            <input class="hotel-input" placeholder="поиск" type="text" data-bind="value: hotelName.selection,attr:{placeholder: hotelName.caption},valueUpdate: 'keyup'">
        </div>
        <div class="div-filter">
            <h4>Количество звезд</h4>
            <div class="stars-select">
                <div class="none-select"></div>
            </div>
            <ul class="stars-li" data-bind="foreach: stars.options">
                <li><input type="checkbox" checked="checkbox" name="0001" id="s0001" data-bind="checked: checked,attr:{id: 's'+key}"><label for="s0001" class="" data-bind="text: key,attr: {for: 's'+key,class: cls()}">1</label></li>
            </ul>
        </div>
        <div class="div-filter">
            <h4>Цена за сутки</h4>
            <div class="slider-wrapper-div">
                <input data-bind="priceSlider: price"/>
            </div>
        </div>
        <div class="div-filter">
            <h4>Удаленность от центра</h4>
            <div class="slider-wrapper-div">
                <input data-bind="singleSlider: distance" data-dimension="км"/>
            </div>
        </div>
        <div class="div-filter" data-bind="template: {name: 'avia-filter-list', data: services, if: services.active}, visible: services.active">
        </div>
    </div>
</script>
