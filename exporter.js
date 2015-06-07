(function(console){

  /* console.save() from dev tools code snippets 
   * http://bgrins.github.io/devtools-snippets/#console-save
   */


  console.save = function(data, filename){

    if(!data) {
      console.error('Console.save: No data')
      return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
      data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
    e    = document.createEvent('MouseEvents'),
    a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
  }
})(console);


(function() {
  var tables = $('table'),
      entries = [],
      nodes = $('#content').children(),
      months = {"January": 1,
          "February": 2,
          "March": 3,
          "April": 4,
          "May": 5,
          "June": 6,
          "July": 7,
          "August": 8,
          "September": 9,
          "October": 10,
          "November": 11,
          "December": 12
      };

  function process_date(node) {
    var date = node.text().split(' '),
        monthName = date[0],
        month = months[date[0]],
        day = parseInt(date[1].replace(/\,/g,'')),
        year = parseInt(date[2]),
        dateObject = new Date(year, month, day);

    return {
      'month': month, 
      'monthName': monthName,
      'day': day, 
      'year': year,
      'ts': dateObject.getTime()
    }
  }

  function process_table(node, date) {
    var rows = node.children('tbody').children(),
        new_entries = [];

    for (var j=0; j < rows.length; j++) {
      row = $(rows[j])[0];

      if (row.classList[0] !== 'title') {
        var entry = {};
        
        entry.exercise = $(row.children[0]).text();
        entry.sets = $(row.children[2]).text();
        entry.reps = $(row.children[3]).text();
        entry.weight = $(row.children[4]).text().trim();
        entry.month = date.month;
        entry.day = date.day;
        entry.year = date.year;
        entry.monthName = date.monthName;
        entry.ts = date.ts;

        new_entries.push(entry);
      }
    }

    return new_entries
  }

  for (var i=0; i < nodes.length; i++) {
    var node = $(nodes[i]),
      date;
    
    if (node.prop('tagName') === "H2") {
      date = process_date(node); 
    } else if (node.prop('tagName') === "TABLE") {
      var new_entries = process_table(node, date);
      entries = entries.concat(new_entries);
    }
  }
  
  var json_entries = JSON.stringify(entries),
      date = new Date;

  console.save(json_entries, "mfp-export-" + date.getTime());

})();
