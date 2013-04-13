define([
    // Libraries
    'jquery',
    'underscore',
    'backbone',
    'd3',
    'topojson'
], function($, _, Backbone, d3, TopoJson) {

    var MapView = Backbone.View.extend({
        id: 'map',
        initialize: function(options) {
            // todo: less hardcoding!
            this.options = options;
            this.width = 960;
            this.height = 500;
            
            this.datafile = 'community_areas_100m.topojson';
            this.topo_obj_key = 'communities';
            // this.svg = this.$el.append($('<svg>')); // needs to be an d3 created thingy
            this.svg = d3.select(this.el).append("svg")
                .attr("width", this.width)
                .attr("height", this.height);

            this.projection = d3.geo.mercator();

            this.path = d3.geo.path()
                  .projection(this.projection);

            this.render();
        },
        get_scale_and_translate: function(b) {
            s = .95 / Math.max((b[1][0] - b[0][0]) / this.width, (b[1][1] - b[0][1]) / this.height),
            t = [(this.width - s * (b[1][0] + b[0][0])) / 2, (this.height - s * (b[1][1] + b[0][1])) / 2];
            return { scale: s, translate: t}
        },

        render: function(context) {
            var view = this;
            if (d3) {
                d3.json(view.datafile, _.bind(function(error, topojson_data) {

                  this.topo_polys = topojson_data.objects[this.topo_obj_key]
                  this.polys = TopoJson.object(topojson_data, this.topo_polys);

                  this.projection.scale(1).translate([0, 0]);

                  var b = this.path.bounds(this.polys);
                  var st = this.get_scale_and_translate(b);

                  this.projection
                      .scale(st.scale)
                      .translate(st.translate);

                  this.svg.append("path")
                      .datum(this.polys)
                      .attr("class", "map-feature")
                      .attr("d", this.path);

                  this.svg.append("path") // boundary lines
                      .datum(TopoJson.mesh(topojson_data, this.topo_polys, function(a, b) { return a !== b; }))
                      .attr("class", "map-mesh")
                      .attr("d", this.path);

                  if (this.options && typeof this.options.area_number != 'undefined') {
                      this.zoom(this.options.area_number);
                  }
                },this));
            } else {
                console.log("no d3?")
            }

        },
        show: function() {
            this.$el.show();
            this.zoom();
            return this;
        },
        hide: function() {
            this.$el.hide();
            return this;
        },
        zoom: function(area_number) {
            console.log('CHICAGO CRIME [js/MapView.js]: zoom to area ' + area_number);
            // apply 'map-selected' to chosen
            
            var selected_poly = this.polys.geometries.filter(function(d) { return d.properties['AREA_NUMBE'] === area_number; })[0];
            var b = this.path.bounds(selected_poly);
            var st = this.get_scale_and_translate(b);

            this.svg.append("path")
                .datum(selected_poly)
                .attr("class", "map-selected")
                .attr("d", this.path);

        }
    });

    return MapView;

});
