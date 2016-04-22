
jQuery(document).ready(function() {

   
    
    //////////////////////////////////////////////

    var kb = tabulator.kb;
    var fetcher = tabulator.sf;
    var ns = tabulator.ns;
    var dom = document;

    var ICAL = $rdf.Namespace('http://www.w3.org/2002/12/cal/ical#');
    var SCHED = $rdf.Namespace('http://www.w3.org/ns/pim/schedule#');
    var DC = $rdf.Namespace('http://purl.org/dc/elements/1.1/');
    var UI = $rdf.Namespace('http://www.w3.org/ns/ui#');
    var FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
    
    var uri = window.location.href;
    var base = window.document.title = uri.slice(0, uri.lastIndexOf('/')+1);
    var testDocURI = base + 'test.ttl'; // imaginary doc - just use its URL
    var testDoc = $rdf.sym(testDocURI);
    var subject_uri = testDocURI + '#event1';
    var me_uri = testDocURI + '#a0';
    var me = kb.sym(me_uri);
    
//    var forms_uri = window.document.title = base+ 'forms.ttl';


    var subject = kb.sym(subject_uri);
    var div = dom.getElementById('UITestArea');
  
    
    var showResults = function() {
    
        //       Now the form for responsing to the poll
        //

        // div.appendChild(dom.createElement('hr'))
        
        var invitation = subject;

        var query = new $rdf.Query('Responses');
        var v = {};
        ['time', 'author', 'value', 'resp', 'cell'].map(function(x){
             query.vars.push(v[x]=$rdf.variable(x))});
        query.pat.add(invitation, SCHED('response'), v.resp);
        query.pat.add(v.resp, DC('author'), v.author);
        query.pat.add(v.resp, SCHED('cell'), v.cell);
        query.pat.add(v.cell, SCHED('availabilty'), v.value);
        query.pat.add(v.cell, ICAL('dtstart'), v.time);
        /*
        var prologue = "    @prefix foaf:  <http://xmlns.com/foaf/0.1/>.\n\
    @prefix sched: <http://www.w3.org/ns/pim/schedule#>.\n\
    @prefix ical:  <http://www.w3.org/2002/12/cal/icaltzd#>.\n\
    @prefix dc:    <http://purl.org/dc/elements/1.1/>.\n";
    */
        var prologue = dom.getElementById('Prologue').textContent;
        
        //var config = dom.getElementById('Config').textContent;
        // $rdf.parse(prologue + config, kb, testDocURI, 'text/turtle') // str, kb, base, contentType

        var tests = dom.getElementById('TestData').children;
        var inputText = function(tr) {
            return tr.children[0].children[0].textContent;
        }
        var output = function(tr) {
            return tr.children[1];
        }
        var t = 0;
        $rdf.parse(prologue + inputText(tests[t]), kb, testDocURI, 'text/turtle') // str, kb, base, contentType
        
        var options = {};
        
        var setAxes = function() {
            options.set_x = kb.each(subject, SCHED('option')); // @@@@@ option -> dtstart in future
            options.set_x = options.set_x.map(function(opt){return kb.any(opt, ICAL('dtstart'))});

            options.set_y = kb.each(subject, SCHED('response'));
            options.set_y = options.set_y.map(function(resp){return kb.any(resp, DC('author'))});
        };
        setAxes();
        
        var possibleTimes = kb.each(invitation, SCHED('option'))
            .map(function(opt){return kb.any(opt, ICAL('dtstart'))});

         var displayTheMatrix = function() {
            var matrix = div.appendChild(tabulator.panes.utils.matrixForQuery(
                dom, query, v.time, v.author, v.value, options, function(){})); 
            
            matrix.setAttribute('class', 'matrix');
            
            var refreshButton = dom.createElement('button');
            refreshButton.textContent = "refresh";
            refreshButton.addEventListener('click', function(e) {
                    matrix.refresh();
            }, false);
            return matrix;
        };

        // @@ Give other combos too-- see schedule ontology
        var possibleAvailabilities = [ SCHED('No'), SCHED('Maybe'), SCHED('Yes')];
 
        
        var dataPointForNT = [];
        

        var doc = testDoc;
        options.set_y = options.set_y.filter(function(z){ return (! z.sameTerm(me))});
        options.set_y.push(me); // Put me on the end

        options.cellFunction = function(cell, x, y, value) {
        
            var refreshColor = function() {
                var bg = kb.any(value, UI('backgroundColor'));
                if (bg) cell.setAttribute('style', 'text-align: center; background-color: ' + bg + ';');                    
            };
            if (value !== null) {
                refreshColor();
            } 
            if (y.sameTerm(me)) {
                var callback = function() { refreshColor(); }; //  @@ may need that
                var selectOptions = {};
                var predicate = SCHED('availabilty');
                var cellSubject = dataPointForNT[x.toNT()];
                var selector = tabulator.panes.utils.makeSelectForOptions(dom, kb, cellSubject, predicate,
                        possibleAvailabilities, selectOptions, testDoc, callback);
                cell.appendChild(selector);
            } else if (value !== null) {
                
                cell.textContent = tabulator.Util.label(value);
            }
        
        };

 
        var matrix = displayTheMatrix();

        var agenda = [];

        var nextTest = function nextTest() {
            // First take a copy of the DOM the klast test produced
            output(tests[t]).appendChild(matrix.cloneNode(true));

            t += 1;
            var test = tests[t];
            if (!test) return;

            kb.removeMany(undefined, undefined, undefined, testDoc);  // Flush out previous test data
            $rdf.parse(prologue + inputText(tests[t]), kb, testDocURI, 'text/turtle') ;
            setAxes();
            matrix.refresh();

            setTimeout(nextTest, 2000);
        
        };
 

        agenda.push(nextTest);

        setTimeout(function(){ agenda.shift()()}, 2000);

        
    }; // showResults
    
    

    showResults();

});


