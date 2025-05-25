export function initializeMasonry(el: HTMLDivElement)
{
    let children: HTMLDivElement[]= [];
    for (const child of el.children)
    {
        if (child.tagName.toLocaleLowerCase() != "div" || !child.classList.contains("gallery-item")) {
            throw new TypeError("Except all children of masonry are div, and have gallery-item class.");
        }
        children.push(child as HTMLDivElement);
        children = children.toReversed();
    }

    el.innerHTML = ""
    createMasonryLayout(el, children);

    window.addEventListener(
        "resize", 
        throttle(
            () => createMasonryLayout(el, children),
            200
        ),
    );
}

function createMasonryLayout(el: HTMLDivElement, children: HTMLDivElement[])
{
    const columnNums = getColumnNums();
    if (el.children.length === columnNums) return;

    el.innerHTML = "";
    const gutters = Array.from({ length: columnNums }, () => {
        const gutter = document.createElement("div");
        gutter.classList.add("gallery-gutter");
        return {
            el: gutter,
            height: 0,
        };
    })

    for (const child of children) {
        const childHeight = parseInt(child.getAttribute("data-height")!);
        const gutterInfo = gutters.find(
            gu => gu.height == Math.min(...gutters.map(item => item.height)));
        gutterInfo!.el.appendChild(child);
        gutterInfo!.height += childHeight;
    }
    gutters.forEach(g => el.appendChild(g.el));
}

function getColumnNums() {
    const mdBreakpoint = parseInt(window
        .getComputedStyle(document.body)
        .getPropertyValue("--breakpoint-md"));

    if (window.innerWidth > mdBreakpoint){
        return 4;
    }
    else {
        return 2;
    }
}

function throttle<Args extends Array<any>>(
    func: (...args: Args) => void, 
    limit: number
): (...args: Args) => void {
  let lastRan = 0;
  let activeTimeout: NodeJS.Timeout | undefined;
  return (...args: Args) => {
    const now = Date.now();

    if (now - lastRan >= limit) {
        func(...args);
        lastRan = now;
    }
    else {
        clearTimeout(activeTimeout);
        activeTimeout = setTimeout(() => {
                if (now - lastRan >= limit) {
                    func(...args);
                    lastRan = now;
                    activeTimeout = undefined;
                }
            },
            limit - (now - lastRan)
        );
    }
  };
}
