// Create a break line element
let br = document.createElement("br");

let click_counter_existing = 1;
let click_counter_custom = 1;

function add_existing() {
    let form = document.getElementById("postform");

    let div_form = document.createElement("div");
    div_form.setAttribute("class", "form-group")
    form.appendChild(div_form);

    let hr_new = document.createElement("hr");
    div_form.appendChild(hr_new);
    let hr_new2 = document.createElement("hr");
    div_form.appendChild(hr_new2);

    let plot_btn = document.getElementsByClassName("plot-primary")
    for (let el of plot_btn){
        el.setAttribute("hidden", "True");
        el.setAttribute("disabled", "True");
    }
    // form.removeChild(plot_btn);

    let br_primary = document.getElementById("br-primary")
    br_primary.setAttribute("hidden", "True");

    let existing_name = document.createElement("input");
    existing_name.setAttribute("type", "text");
    existing_name.setAttribute("name", "textfields-existing-"+click_counter_existing);
    existing_name.setAttribute("placeholder", "Name or number code");
    existing_name.setAttribute("class", "form-control");
    existing_name.setAttribute("id", "textfield-"+click_counter_existing);

    let label = document.createElement('label');
    label.setAttribute("for", "textfield-"+click_counter_existing);
    label.innerHTML = 'Enter an existing object:'
    div_form.appendChild(label);

    div_form.appendChild(existing_name);

    let small_txt = document.createElement("small");
    small_txt.setAttribute("id", "texfield-small-help");
    small_txt.setAttribute("class", "form-text text-muted");
    small_txt.innerHTML = 'E.g. "<b>Eros</b>", "<b>67P</b>", "<b>99942</b>", one object at line.   ' +
        'But be specific: request "<b>Borisov</b>" will return several objects, and only the first will be added to plot.'
    div_form.appendChild(small_txt);

    let br_new = document.createElement("br");
    div_form.appendChild(br_new);


    let s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Plot");
    s.setAttribute("class", "plot-primary btn btn-primary btn-lg");
    // s.setAttribute("id", "plot-primary");
    div_form.appendChild(s);
    // let textfield = document.getElementById("textfield-"+click_counter_existing);


    click_counter_existing += 1;
}

function add_custom() {
    let form = document.getElementById("postform");
    let plot_btn = document.getElementsByClassName("plot-primary")
    for (let el of plot_btn){
        el.setAttribute("hidden", "True");
        el.setAttribute("disabled", "True");
    }

    let br_primary = document.getElementById("br-primary")
    br_primary.setAttribute("hidden", "True");

    let params = {'name': ['Object Name', 'Earth'],
        'a': ['Semi-major axis (a.u.)', '1.000'],
        'e': ['Eccentricity', '0.0167'],
        'i': ['Inclination (deg)', '0.0'],
        'w': ['Argument of perihelion (deg)', '114.2'],
        'node': ['Longitude of ascending node (deg)', '−11.26'],
        'tp': ['Date of perihelion passage', '2022-01-04']}
    let hr_new = document.createElement("hr");
    form.appendChild(hr_new);
    let hr_new2 = document.createElement("hr");
    form.appendChild(hr_new2);

    for (const element in params) {
        let div_form = document.createElement('div');
        div_form.setAttribute('class', "form-group");
        div_form.setAttribute('id', "form-"+element+"-"+click_counter_custom);
        form.appendChild(div_form);

        let div_form_inst = document.getElementById("form-"+element+"-"+click_counter_custom);
        // console.log(element, params[element]);
        let custom_input = document.createElement('input');
        if (element === 'tp') {
            custom_input.setAttribute("type", "date");
        }
        else {
            custom_input.setAttribute("type", "text");
        }
        custom_input.setAttribute("name", "textfields-custom-"+element+"-"+click_counter_custom);
        custom_input.setAttribute("placeholder", params[element]['1']);
        custom_input.setAttribute("id", element);
        custom_input.setAttribute("class", 'form-control');


        let custom_input_label = document.createElement('label');
        custom_input_label.setAttribute("for", element);
        custom_input_label.setAttribute("value", params[element]['0']);
        custom_input_label.setAttribute("id", 'label-'+element+'-'+click_counter_custom);

        // let el = document.getElementById(element);
        // let text = document.createTextNode(params[element]['0']);
        // el.appendChild(text);

        div_form_inst.appendChild(custom_input_label);
        div_form_inst.appendChild(custom_input);
        document.getElementById('label-'+element+'-'+click_counter_custom).innerHTML = params[element]['0'];

        let br_new = document.createElement("br");
        form.appendChild(br_new);
    }
    let s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Plot");
    s.setAttribute("class", "plot-primary btn btn-primary btn-lg");
    // s.setAttribute("id", "plot-primary");


    form.appendChild(s);
    click_counter_custom += 1;

}