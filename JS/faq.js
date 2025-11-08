// 1️⃣ Accordion Expand/Collapse Functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');

            // Select the accordion body (next sibling)
            const accordionBody = this.nextElementSibling;

            // Expand / Collapse logic
            if (accordionBody.classList.contains('show')) {
                accordionBody.classList.remove('show');
                accordionBody.style.maxHeight = null;
            } else {
                accordionBody.classList.add('show');
                accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
            }

            // Close other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    const otherAccordionBody = otherHeader.nextElementSibling;
                    otherAccordionBody.classList.remove('show');
                    otherAccordionBody.style.maxHeight = null;
                }
            });
        });
    });
});


am5.ready(function() {

    // Create root element
    var root = am5.Root.new("chartdiv1");

    // Set theme
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Define Data
    var data = {
        value: 0,
        children: [
            {
                name: "Flora",
                children: [
                    { name: "Black Tea", value: 1 },
                    {
                        name: "Floral",
                        children: [
                            { name: "Chamomile", value: 1 },
                            { name: "Rose", value: 1 },
                            { name: "Jasmine", value: 1 }
                        ]
                    }
                ]
            },
            {
                name: "Fruity",
                children: [
                    {
                        name: "Berry",
                        children: [
                            { name: "Blackberry", value: 1 },
                            { name: "Raspberry", value: 1 },
                            { name: "Blueberry", value: 1 },
                            { name: "Strawberry", value: 1 }
                        ]
                    }
                    // ... (you can keep the rest of your Fruity, Sour, Green, etc. data here)
                ]
            }
            // ... (other main categories like Sour/Fermented, Green/Vegetative, etc.)
        ]
    };

    // Create Zoomable Container
    var zoomableContainer = root.container.children.push(
        am5.ZoomableContainer.new(root, {
            width: am5.p100,
            height: am5.p100,
            wheelable: true,
            pinchZoom: true
        })
    );

    // Add Zoom Tools
    var zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
        target: zoomableContainer
    }));

    // Create Force-Directed Series
    var series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(root, {
        maskContent: false,
        singleBranchOnly: false,
        downDepth: 2,
        topDepth: 1,
        initialDepth: 3,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "name",
        linkWithField: "linkWith",
        manyBodyStrength: -10,
        centerStrength: 0.8
    }));

    // Customize appearance
    series.get("colors").setAll({ step: 2 });
    series.links.template.set("strength", 0.5);
    series.labels.template.set("minScale", 0);

    // Set data
    series.data.setAll([data]);

    // Select root node
    series.set("selectedDataItem", series.dataItems[0]);

    // Animate on load
    series.appear(1000, 100);

}); // end am5.ready()

am5.ready(function() {

    // Create root element
    var root = am5.Root.new("chartdiv2");

    // Set theme
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Define Data
    var data = {
        value: 0,
        children: [
            {
                name: "Flora",
                children: [
                    { name: "Black Tea", value: 1 },
                    {
                        name: "Floral",
                        children: [
                            { name: "Chamomile", value: 1 },
                            { name: "Rose", value: 1 },
                            { name: "Jasmine", value: 1 }
                        ]
                    }
                ]
            },
            {
                name: "Fruity",
                children: [
                    {
                        name: "Berry",
                        children: [
                            { name: "Blackberry", value: 1 },
                            { name: "Raspberry", value: 1 },
                            { name: "Blueberry", value: 1 },
                            { name: "Strawberry", value: 1 }
                        ]
                    }
                    // ... (you can keep the rest of your Fruity, Sour, Green, etc. data here)
                ]
            }
            // ... (other main categories like Sour/Fermented, Green/Vegetative, etc.)
        ]
    };

    // Create Zoomable Container
    var zoomableContainer = root.container.children.push(
        am5.ZoomableContainer.new(root, {
            width: am5.p100,
            height: am5.p100,
            wheelable: true,
            pinchZoom: true
        })
    );

    // Add Zoom Tools
    var zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
        target: zoomableContainer
    }));

    // Create Force-Directed Series
    var series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(root, {
        maskContent: false,
        singleBranchOnly: false,
        downDepth: 2,
        topDepth: 1,
        initialDepth: 3,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "name",
        linkWithField: "linkWith",
        manyBodyStrength: -10,
        centerStrength: 0.8
    }));

    // Customize appearance
    series.get("colors").setAll({ step: 2 });
    series.links.template.set("strength", 0.5);
    series.labels.template.set("minScale", 0);

    // Set data
    series.data.setAll([data]);

    // Select root node
    series.set("selectedDataItem", series.dataItems[0]);

    // Animate on load
    series.appear(1000, 100);

}); // end am5.ready()

am5.ready(function() {

    // Create root element
    var root = am5.Root.new("chartdiv2");

    // Set theme
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Define Data
    var data = {
        value: 0,
        children: [
            {
                name: "Flora",
                children: [
                    { name: "Black Tea", value: 1 },
                    {
                        name: "Floral",
                        children: [
                            { name: "Chamomile", value: 1 },
                            { name: "Rose", value: 1 },
                            { name: "Jasmine", value: 1 }
                        ]
                    }
                ]
            },
            {
                name: "Fruity",
                children: [
                    {
                        name: "Berry",
                        children: [
                            { name: "Blackberry", value: 1 },
                            { name: "Raspberry", value: 1 },
                            { name: "Blueberry", value: 1 },
                            { name: "Strawberry", value: 1 }
                        ]
                    }
                    // ... (you can keep the rest of your Fruity, Sour, Green, etc. data here)
                ]
            }
            // ... (other main categories like Sour/Fermented, Green/Vegetative, etc.)
        ]
    };

    // Create Zoomable Container
    var zoomableContainer = root.container.children.push(
        am5.ZoomableContainer.new(root, {
            width: am5.p100,
            height: am5.p100,
            wheelable: true,
            pinchZoom: true
        })
    );

    // Add Zoom Tools
    var zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
        target: zoomableContainer
    }));

    // Create Force-Directed Series
    var series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(root, {
        maskContent: false,
        singleBranchOnly: false,
        downDepth: 2,
        topDepth: 1,
        initialDepth: 3,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "name",
        linkWithField: "linkWith",
        manyBodyStrength: -10,
        centerStrength: 0.8
    }));

    // Customize appearance
    series.get("colors").setAll({ step: 2 });
    series.links.template.set("strength", 0.5);
    series.labels.template.set("minScale", 0);

    // Set data
    series.data.setAll([data]);

    // Select root node
    series.set("selectedDataItem", series.dataItems[0]);

    // Animate on load
    series.appear(1000, 100);

}); // end am5.ready()

am5.ready(function() {

    // Create root element
    var root = am5.Root.new("chartdiv3");

    // Set theme
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Define Data
    var data = {
        value: 0,
        children: [
            {
                name: "Flora",
                children: [
                    { name: "Black Tea", value: 1 },
                    {
                        name: "Floral",
                        children: [
                            { name: "Chamomile", value: 1 },
                            { name: "Rose", value: 1 },
                            { name: "Jasmine", value: 1 }
                        ]
                    }
                ]
            },
            {
                name: "Fruity",
                children: [
                    {
                        name: "Berry",
                        children: [
                            { name: "Blackberry", value: 1 },
                            { name: "Raspberry", value: 1 },
                            { name: "Blueberry", value: 1 },
                            { name: "Strawberry", value: 1 }
                        ]
                    }
                    // ... (you can keep the rest of your Fruity, Sour, Green, etc. data here)
                ]
            }
            // ... (other main categories like Sour/Fermented, Green/Vegetative, etc.)
        ]
    };

    // Create Zoomable Container
    var zoomableContainer = root.container.children.push(
        am5.ZoomableContainer.new(root, {
            width: am5.p100,
            height: am5.p100,
            wheelable: true,
            pinchZoom: true
        })
    );

    // Add Zoom Tools
    var zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
        target: zoomableContainer
    }));

    // Create Force-Directed Series
    var series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(root, {
        maskContent: false,
        singleBranchOnly: false,
        downDepth: 2,
        topDepth: 1,
        initialDepth: 3,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "name",
        linkWithField: "linkWith",
        manyBodyStrength: -10,
        centerStrength: 0.8
    }));

    // Customize appearance
    series.get("colors").setAll({ step: 2 });
    series.links.template.set("strength", 0.5);
    series.labels.template.set("minScale", 0);

    // Set data
    series.data.setAll([data]);

    // Select root node
    series.set("selectedDataItem", series.dataItems[0]);

    // Animate on load
    series.appear(1000, 100);

}); // end am5.ready()


am5.ready(function() {

    // Create root element
    var root = am5.Root.new("chartdiv4");

    // Set theme
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Define Data
    var data = {
        value: 0,
        children: [
            {
                name: "Flora",
                children: [
                    { name: "Black Tea", value: 1 },
                    {
                        name: "Floral",
                        children: [
                            { name: "Chamomile", value: 1 },
                            { name: "Rose", value: 1 },
                            { name: "Jasmine", value: 1 }
                        ]
                    }
                ]
            },
            {
                name: "Fruity",
                children: [
                    {
                        name: "Berry",
                        children: [
                            { name: "Blackberry", value: 1 },
                            { name: "Raspberry", value: 1 },
                            { name: "Blueberry", value: 1 },
                            { name: "Strawberry", value: 1 }
                        ]
                    }
                    // ... (you can keep the rest of your Fruity, Sour, Green, etc. data here)
                ]
            }
            // ... (other main categories like Sour/Fermented, Green/Vegetative, etc.)
        ]
    };

    // Create Zoomable Container
    var zoomableContainer = root.container.children.push(
        am5.ZoomableContainer.new(root, {
            width: am5.p100,
            height: am5.p100,
            wheelable: true,
            pinchZoom: true
        })
    );

    // Add Zoom Tools
    var zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
        target: zoomableContainer
    }));

    // Create Force-Directed Series
    var series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(root, {
        maskContent: false,
        singleBranchOnly: false,
        downDepth: 2,
        topDepth: 1,
        initialDepth: 3,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "name",
        linkWithField: "linkWith",
        manyBodyStrength: -10,
        centerStrength: 0.8
    }));

    // Customize appearance
    series.get("colors").setAll({ step: 2 });
    series.links.template.set("strength", 0.5);
    series.labels.template.set("minScale", 0);

    // Set data
    series.data.setAll([data]);

    // Select root node
    series.set("selectedDataItem", series.dataItems[0]);

    // Animate on load
    series.appear(1000, 100);

}); // end am5.ready()


am5.ready(function() {

    // Create root element
    var root = am5.Root.new("chartdiv5");

    // Set theme
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Define Data
    var data = {
        value: 0,
        children: [
            {
                name: "Flora",
                children: [
                    { name: "Black Tea", value: 1 },
                    {
                        name: "Floral",
                        children: [
                            { name: "Chamomile", value: 1 },
                            { name: "Rose", value: 1 },
                            { name: "Jasmine", value: 1 }
                        ]
                    }
                ]
            },
            {
                name: "Fruity",
                children: [
                    {
                        name: "Berry",
                        children: [
                            { name: "Blackberry", value: 1 },
                            { name: "Raspberry", value: 1 },
                            { name: "Blueberry", value: 1 },
                            { name: "Strawberry", value: 1 }
                        ]
                    }
                    // ... (you can keep the rest of your Fruity, Sour, Green, etc. data here)
                ]
            }
            // ... (other main categories like Sour/Fermented, Green/Vegetative, etc.)
        ]
    };

    // Create Zoomable Container
    var zoomableContainer = root.container.children.push(
        am5.ZoomableContainer.new(root, {
            width: am5.p100,
            height: am5.p100,
            wheelable: true,
            pinchZoom: true
        })
    );

    // Add Zoom Tools
    var zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
        target: zoomableContainer
    }));

    // Create Force-Directed Series
    var series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(root, {
        maskContent: false,
        singleBranchOnly: false,
        downDepth: 2,
        topDepth: 1,
        initialDepth: 3,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "name",
        linkWithField: "linkWith",
        manyBodyStrength: -10,
        centerStrength: 0.8
    }));

    // Customize appearance
    series.get("colors").setAll({ step: 2 });
    series.links.template.set("strength", 0.5);
    series.labels.template.set("minScale", 0);

    // Set data
    series.data.setAll([data]);

    // Select root node
    series.set("selectedDataItem", series.dataItems[0]);

    // Animate on load
    series.appear(1000, 100);

}); // end am5.ready()
