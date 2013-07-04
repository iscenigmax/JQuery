jQuery.fn.resize = function (w,h) {
    this.css({
        "width": (MNI(w).toString() + "px"),
        "height": (MNI(h).toString() + "px")
    });
    return this;
}