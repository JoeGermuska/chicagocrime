define([ 'underscore', 'backbone', 'text!templates/table.jst' ], function(_, Backbone, TableTemplate) {
    var CommunityAreaListView = Backbone.View.extend({
        el: '#community-area-list',
        initialize: function(options) {
            this.template = _.template(TableTemplate);
            this.collection.bind('sync', this.render, this);
        },
        render: function() {
            console.log('CHICAGO CRIME [js/views/CommunityAreaListView.js]: Render community area list table.');
            var data = this.collection.toJSON();
            _.each(data, function(row) {
                row["name"] = '<a href="#community/' + row.area_number + '">' + row.name + '</a>';
            });
            this.$el.append(this.template({
                'title': 'Chicago Community Areas', 
                'headers': _.keys(data[0]), 
                'data': data,
                'order': ["name", "area_number", "hardship_index", "pct_crowded", "pct_no_diploma", "pct_old_and_young", "pct_poverty", "pct_unemployed", "per_capita_income", "population", "shape_area"] 
            }));
            this.$el.show();
            return this;
        }
    });
    return CommunityAreaListView;
});