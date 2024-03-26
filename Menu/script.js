var timeOut;

class Item {
    constructor(icon, backgroundColor, link) {
        this.$element = $(document.createElement("div"));
        this.icon = icon;
        this.$element.addClass("item");
        this.$element.css("background-color", "rgb(255, 180, 192)");
        var i = document.createElement("i");
        $(i).addClass("fi-" + icon);
        this.$element.append(i);
        this.prev = null;
        this.next = null;
        this.isMoving = false;
        this.link = link;
        this.$element.on("click", () => {
            window.location.href = this.link;
        })
        var element = this;
        this.$element.on("mouseenter", function() {
            clearTimeout(timeOut);
            timeOut = setTimeout(function() {
                if (element.next && element.isMoving) {
                    element.next.moveTo(element);
                }
            }, 10);
            element.$element.css("background-color", "white");
            element.$element.css("transform", "scale(1.2)");
        });
        this.$element.on("mouseleave", function() {
            clearTimeout(timeOut);
            timeOut = setTimeout(function() {
                if (element.next && element.isMoving) {
                    element.next.moveTo(element);
                }
            }, 10);
            element.$element.css("background-color", "rgb(255, 180, 192)");
            element.$element.css("transform", "scale(1)");
        });
    }

    moveTo(item) {
        anime({
            targets: this.$element[0],
            left: item.$element.css("left"),
            top: item.$element.css("top"),
            duration: 700,
            elasticity: 500
        });
        if (this.next) {
            this.next.moveTo(item);
        }
    }

    updatePosition() {
        anime({
            targets: this.$element[0],
            left: this.prev.$element.css("left"),
            top: this.prev.$element.css("top"),
            duration: 80
        });

        if (this.next) {
            this.next.updatePosition();
        }
    }
}

class Menu {
    constructor(menu) {
        this.$element = $(menu);
        this.size = 0;
        this.first = null;
        this.last = null;
        this.timeOut = null;
        this.hasMoved = false;
        this.status = "closed";
    }

    add(item) {
        var menu = this;
        if (this.first == null) {
            this.first = item;
            this.last = item;
            this.first.$element.on("mouseup", function() {
                if (menu.first.isMoving) {
                    menu.first.isMoving = false;
                } else {
                    menu.click();
                }
            });
            item.$element.draggable(
                {
                    start: function() {
                        menu.close();
                        item.isMoving = true;
                    }
                },
                {
                    drag: function() {
                        if (item.next) {
                            item.next.updatePosition();
                        }
                    }
                },
                {
                    stop: function() {
                        item.isMoving = false;
                        item.next.moveTo(item);
                    }
                }
            );
        } else {
            this.last.next = item;
            item.prev = this.last;
            this.last = item;
        }
        this.$element.after(item.$element);
    }

    open() {
        this.status = "open";
        var current = this.first.next;
        var iterator = 1;
        var head = this.first;
        var sens = head.$element.css("left") < head.$element.css("right") ? 1 : -1;
        while (current != null) {
            anime({
                targets: current.$element[0],
                left: parseInt(head.$element.css("left"), 10) + (sens * (iterator * 70)),
                top: head.$element.css("top"),
                duration: 500
            });
            iterator++;
            current = current.next;
        }
    }
    

    close() {
        this.status = "closed";
        var current = this.first.next;
        var head = this.first;
        var iterator = 1;
        while (current != null) {
            anime({
                targets: current.$element[0],
                left: head.$element.css("left"),
                top: head.$element.css("top"),
                duration: 500
            });
            iterator++;
            current = current.next;
        }
    }

    click() {
        if (this.status == "closed") {
            this.open();
        } else {
            this.close();
        }
    }
}

var menu = new Menu("#myMenu");
var item1 = new Item("list", "rgb(255, 180, 192)", "#");
var item2 = new Item("home", "rgb(255, 180, 192)", "../Index/index.html");
var item3 = new Item("checkbox", "rgb(255, 180, 192)", "../Quizmenu/quizmenu.html");
var item4 = new Item("graph-bar", "rgb(255, 180, 192)", "../Leaderboard/index.html");
var item5 = new Item("social-github", "rgb(255, 180, 192)");

menu.add(item1);
menu.add(item2);
menu.add(item3);
menu.add(item4);
menu.add(item5);
$(document).delay(50).queue(function(next) {
    menu.open();
    next();
    $(document).delay(1000).queue(function(next) {
        menu.close();
        next();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var sakuraTwig1 = document.getElementById('sakuraTwig1');
    var sakuraTwig2 = document.getElementById('sakuraTwig2');
    var positions = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

    function getNextPositionIndex(currentIndex) {
        return (currentIndex + 1) % positions.length;
    }

    function changePosition() {

        var lastPositionIndex = parseInt(localStorage.getItem('lastPositionIndex') || '-1');
        var nextPositionIndex = getNextPositionIndex(lastPositionIndex);


        localStorage.setItem('lastPositionIndex', nextPositionIndex.toString());

        sakuraTwig1.classList.remove(...positions);
        sakuraTwig2.classList.remove(...positions);

        var newPosition1 = positions[nextPositionIndex];
        var newPosition2 = positions[(nextPositionIndex + 2) % positions.length];

        sakuraTwig1.classList.add(newPosition1);
        sakuraTwig2.classList.add(newPosition2);
    }

    changePosition();
});

$(".item").css("transition", "transform 0.3s");
$(".item").hover(
    function() {
        $(this).css("transform", "scale(1.2)");
    },
    function() {
        $(this).css("transform", "scale(1)");
    }
);
