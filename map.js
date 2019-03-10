class Map {
  constructor(target) {
    this._init(target)
  }
  _init(target) {
    this.map = new ol.Map({
      target: target,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: [113.239642, 23.15483],
        zoom: 18,
        minZoom: 17,
        maxZoom: 19,
        projection: 'EPSG:4326'
      })
    })
  }
  getLayers() {
    return this.map.getLayers().array_
  }
  addLayers(layers) {
    if (Object.prototype.toString.call(layers) !== '[object Array]') {
      return
    }
    
    for(let i = 0, len = layers.length - 1; i <= len; i++) {
      this.map.addLayer(layers[i])
    }
  }
  getZoom() {
    return this.map.getView().getZoom()
  }
  getView() {
    return this.map.getView()
  }
  removeLayer(layer) {
    this.map.removeLayer(layer)
  }
}

/**
 * @param1 地图视图extent范围
 * @param2 瓦片的大小 size (如256,512)
 * 
**/
function getResolutions(extent, tileSize) {
  var width = ol.extent.getWidth(extent)
  var height = ol.extent.getHeight(extent)
  // 最大分辨率
  var maxResolution = (width <= height ? height : width) / (tileSize)
  // 数组大小,根据情况而定
  var resolutions = new Array(16)
  for (var i = 0; i < 16; i++) {
    resolutions[i] = maxResolution / Math.pow(2, i)
  }
  // 返回地图分辨率数组
  return resolutions
}