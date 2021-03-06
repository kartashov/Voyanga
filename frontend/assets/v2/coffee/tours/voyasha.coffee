# Abstact class for set of tickets
class Voyasha
  constructor: (@toursResultSet)->
    # FIXME price is enough here tbh
    @selected = ko.computed =>
      result = []
      for item in  @toursResultSet.data()
        if item.isAvia()
          result.push @handleAvia item
        else
          result.push @handleHotels item
      result
    @price = ko.computed =>
      result = 0
      for item in @selected()
        result += item.price
      result

    @title = do @getTitle

  handleAvia: =>
    throw "Implement me"

  handleHotels: =>
    throw "Implement me"

  choose: =>
    for item in  @toursResultSet.data()
      if item.isAvia()
        item.select @handleAvia item
      else
        item.select @handleHotels item
    do @toursResultSet.showOverview

class VoyashaCheapest extends Voyasha
  getTitle: =>
    'Самый дешевый'

  # item is TourAviaResultSet
  handleAvia: (item)=>
    item.results().cheapest()

  handleHotels: (item)=>
    data = item.results().data()
    result = {roomSet: data[0].roomSets()[0], hotel : data[0], price: data[0].roomSets()[0].price}
    for hotel in item.results().data()
      for roomSet in hotel.roomSets()
        if roomSet.price < result.roomSet.price
          result.roomSet = roomSet
          result.hotel = hotel
          result.price = result.roomSet.price
    return result

class VoyashaOptima extends Voyasha
  getTitle: =>
    'Оптимальный вариант'

  handleAvia: (item)=>
    item.results().best()

  handleHotels: (item) =>
    data = item.results().data()
    result = {roomSet: data[0].roomSets()[0], hotel : data[0], price: data[0].roomSets()[0].price}
    results = _.filter data, (x)-> x.distanceToCenter <= 6
    results = _.filter results, (x)-> (x.starsNumeric == 3)||(x.starsNumeric == 4)
    results.sort (a,b) -> a.roomSets()[0].price - b.roomSets()[0].price
    if results.length
      data = results[0]
      result = {roomSet: data.roomSets()[0], hotel : data, price: data.roomSets()[0].price}
    results = _.filter results, (x) -> x.rating > 2 
    if results.length
      data = results[0]
      result = {roomSet: data.roomSets()[0], hotel : data, price: data.roomSets()[0].price}
    result
    
class VoyashaRich extends Voyasha
  getTitle: =>
    'Роскошный вариант'

  handleAvia: (item)=>
    data = item.results().data
    result = {'direct': data[0].directRating(), 'price': data[0].price, 'result': data[0]}
    for item in data
      if item.directRating() < result.direct
        result.direct = item.directRating()
        result.price = item.price
        result.result = item
      else if item.directRating() == result.direct
        if item.price < result.price
          result.price = item.price
          result.result = item
    return result.result

  getRating: (x) ->
    hotelRating = Math.abs(4.5-x.starsNumeric)
    if x.rating == '-'
      hotelRating += 4
    else
      hotelRating = hotelRating + Math.abs(4-x.rating)
    if x.distanceToCenter > 3
      hotelRating = hotelRating * 4

    return hotelRating

  handleHotels: (item) =>
    data = item.results().data()
    result = {roomSet: data[0].roomSets()[0], hotel : data[0], price: data[0].roomSets()[0].price}
    results = data #_.filter results, (x)-> (x.starsNumeric == 4)||(x.starsNumeric == 5)
    results.sort (a,b) =>
      aHotelRating = @getRating(a)
      bHotelRating = @getRating(b)
      return a.roomSets()[0].price*aHotelRating  - b.roomSets()[0].price*bHotelRating
    data = results[0]
    result = {roomSet: data.roomSets()[0], hotel : data, price: data.roomSets()[0].price}
    return result