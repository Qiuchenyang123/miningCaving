import L from 'leaflet'
import 'proj4leaflet'
export function CRS4326() {
	return L.CRS.EPSG4326
}

export function CRS3857() {
	return L.CRS.EPSG3857
}

export function CRS3395() {
	return L.CRS.EPSG3395
}

export function CRS900913() {
	return L.CRS.EPSG900913
}

export function CRS4490() {
	const resolutions = [
		1.40625,
		0.703125,
		0.3515625,
		0.17578125,
		0.087890625,
		0.0439453125,
		0.02197265625,
		0.010986328125,
		0.0054931640625,
		0.00274658203125,
		0.001373291015625,
		6.866455078125E-4,
		3.4332275390625E-4,
		1.71661376953125E-4,
		8.58306884765625E-5,
		4.291534423828125E-5,
		2.1457672119140625E-5,
		1.0728836059570312E-5,
		5.364418029785156E-6,
		2.682209064925356E-6,
		1.3411045324626732E-6
	]
	return customCRS('EPSG:4490', '+proj=longlat +ellps=GRS80 +no_defs', resolutions, [-179.9999, 90.00016])
}

export function CRS4547() {
	const resolutions = [
		152.70292183870401,
		78.66369274405216,
		76.35145950317384,
		38.175730459676004,
		19.087865229838002,
		9.543932614919001,
		4.7719663074595005,
		2.3859831537297502,
		1.1929915768648751,
		0.5964957884324376,
		0.2982478942162188,
		0.1491239443421364
	]
	return customCRS('EPSG:4547', '+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs', resolutions, [-5123200, 10002100])
}

export function CRS3006() {
	const resolutions = [8192, 4096, 2048]
	return customCRS('EPSG:3006', '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', resolutions, [218128.7031, 6126002.9379])
}

/**
 *
 * @param epsgName 坐标系名称
 * @param format 坐标系转换格式
 * @param resolutions 每个相应缩放级别的分辨率数组,默认是使用 Leaflet 的原生分辨率
 * @param origin  地图像素原点的投影坐标
 * @returns {NewClass|NewClass|NewClass}
 */
export function customCRS(epsgName, format, resolutions, origin) {
	const crs = new L.Proj.CRS(epsgName, format, {
		resolutions: resolutions,
		origin: origin
	})
	return crs
}

export function getCors(crs) {
	switch (crs) {
		case 'EPSG4490':
			return CRS4490()
		case 'EPSG4326':
			return CRS4326()
		case 'EPSG3857':
			return CRS3857()
		case 'EPSG3395':
			return CRS3395()
		case 'EPSG900913':
			return CRS900913()
		case 'EPSG4547':
			return CRS4547()
		default:
			return CRS3006()
	}
}
