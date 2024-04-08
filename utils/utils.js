function mk(type, props, children){
    const el = document.createElement(type);
    if(props) Object.assign(el, props);
    if(children) el.prepend(...children)
    return el
}

window.mk = mk;