let render = (div) => {
    node = document.querySelector('#form');
    node.innerHTML = div;
};

let setExternalScript = (src) => {
    return new Promise((resolve, reject) => {
        const scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.src = src;
        scriptTag.onload = () => resolve();
        document.body.appendChild(scriptTag);
    });
};

let parseForm = async () => {
    let src = document.getElementById("script").value;
    let parser = new DOMParser();
    let doc = parser.parseFromString(src, "text/html")
    for (let i = 0; i < doc.body.childNodes.length; i++) {
        let type = doc.body.childNodes[i].nodeName
        switch (type) {
            case 'DIV':
                render(doc.body.childNodes[i].outerHTML)
                break;
            case 'SCRIPT':
                if (doc.body.childNodes[i].src) {
                    await setExternalScript(doc.body.childNodes[i].src)
                } else {
                    const f = new Function(doc.body.childNodes[i].textContent)
                    f()
                }
                break;
            default:
                console.log("Ignoring node of type: " + type)
        }
    }
};
