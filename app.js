
// Execution
main()


async function read(filename) {
    // read csv file and parse its info into folder where each link belongs, link.
    // Append the result to lol *(list of links)
    let lol = []
    const response = await fetch(filename);
    const data = await response.text();
    const rows = data.split('\n').slice(1);
    rows.forEach(r => {
        const row = r.split(',');
    
        // column specification:
        const link = {folder_name: row[0],
                      link: row[1]}

        lol.push(link)
    });
    console.log(lol)
    return lol
}

async function main(){
    // Read in the data
    data = await read("test1.csv")

    // 1. Update the selection control panel
    update_selection_panel(data)

    // 2. Add Event Listners on all panel control items
    listen_to_panel()
}


function update_selection_panel(data){
    // Update the selection control panel by filling in the folder names

    // Extract the folders from dataset
    const folders = extract_folder_names(data);

    // Creeate folder a tags:
    create_elements_panel(folders);
}


async function listen_to_panel(){
    // Aggregates all event listener to panel control items.

    const panel_items = document.querySelectorAll(".panel-item");

    panel_items.forEach(item => {
        item.addEventListener("click", update_showcase_contents);
    });
}


function update_showcase_contents() {
    // Load all of the link items in the folder. Folder is identified via its innerHTML text
    const search_name = this.innerHTML

    // Clear all children tags inside selection div
    document.getElementById("showcase").innerHTML = ""

    // Filter "data" for folder named : 'search_name' then Extract all links with key word search_name of folder
    const links = extract_filtered_links(search_name)

    // Create and update link tags
    create_elements_gallery(links)

};

function extract_filtered_links(search_name){
    let links = []
    for (d of data){
        if (search_name === d.folder_name) {
            links.push(d.link)
        };
    };
    return links
}



///////////////////////  Utility Functions ///////////////////////////////////////

function create_elements_panel(folders) {
    // Create all a tags for the folders
    for (f of folders) {

        // Create tag
        const tag = document.createElement("a");
        const text = document.createTextNode(f);
        tag.appendChild(text);
        tag.setAttribute("class", "panel-item")

        // Append (insert) tag into div item
        document.getElementById("selection-panel").appendChild(tag);
    }
}

function create_elements_gallery(links) {
    // Create all a tags for the folders
    for (l of links) {

        // Create tag
        const tag = document.createElement("img");
        tag.setAttribute("src", l)

        // Append (insert) tag into div item
        document.getElementById("showcase").appendChild(tag);
    }
}

function extract_folder_names(data){
    // Extract unique items of folder names from dataset
    let folders = []
    for (d of data) {
        folders.push(d.folder_name)
    }
    return unique(folders)
}



function unique(folders){
    // return the unique items from the folders
    return [...new Set(folders)]
}
