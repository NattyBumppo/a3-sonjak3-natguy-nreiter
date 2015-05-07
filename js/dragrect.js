// $(document).ready(initialSetup);

// var dragBoxWidth = 200;
// var dragBoxHeight = 500;
// var dragRectTitleTextHeight = 16;
// var dragBarw = 15;

// var unminimizedTitleBarText = "Launch Log (click to minimize)";
// var minimizedTitleBarText = "Launch Log (click to expand)";

// var dragBarHeight = dragBoxWidth - dragBarw;

// var dragBoxHeightTemp = 0;
// var dragBarHeightTemp = 0;
// var dragBarwTemp = 0;

// var textOffsetX = 5;
// var textOffsetY = 12;

// var mapWidth, mapHeight;
	
// var drag = d3.behavior.drag()
//     .origin(Object)
//     .on("drag", dragMove);

// // Resizing is disabled by default because it
// // complicates things a bit too much

// var dragRight = d3.behavior.drag()
//     .origin(Object)
//     .on("drag", rDragResize);

// var dragLeft = d3.behavior.drag()
//     .origin(Object)
//     .on("drag", lDragResize);

// var dragTop = d3.behavior.drag()
//     .origin(Object)
//     .on("drag", tDragResize);

// var dragBottom = d3.behavior.drag()
//     .origin(Object)
//     .on("drag", bDragResize);

// var isMinimized = false;
	
// function initialSetup()
// {

// 	mapWidth = d3.select("#map").attr("width");
// 	mapHeight = d3.select("#map").attr("height");
// 	svg = d3.select("#map").append("svg")
// 		.attr("width", mapWidth)
// 		.attr("height", mapHeight);

// 	newg = svg.append("g")
// 		  .data([{x: 0, y: 0}]);
		  
// 	dragRect = newg.append("rect")
// 		  .attr("id", "activeDragRect")
// 		  .attr("x", function(d) { return d.x; })
// 		  .attr("y", function(d) { return d.y; })
// 		  .attr("height", dragBoxHeight)
// 		  .attr("width", dragBoxWidth)
// 		  .attr("fill-opacity", 0.5)
// 		  .attr("cursor", "move")
// 		  .call(drag);
	
// 	dragRectText = newg.append("text")
// 		  .attr("id", "dragRectText")
// 		  .attr("x", function(d) { return d.x + textOffsetX; })
// 		  .attr("y", function(d) { return d.y + textOffsetY; })
// 		  .attr("height", dragRectTitleTextHeight)
// 		  .attr("width", dragBoxWidth)
// 		  .attr("fill-opacity", 1.0)
// 		  .attr("fill", "white")
// 		  .attr("font-size", 12)
// 		  .attr("font-family", " 'Titillium Web', sans-serif")
// 		  .attr("cursor", "move")
// 		  .attr("visibility", "visible")
// 		  .call(drag);		
		  
// 	dragRectTitleText = newg.append("text")
// 		  .attr("id", "dragRectTitleText")
// 		  .attr("x", function(d) { return d.x + textOffsetX; })
// 		  .attr("y", function(d) { return d.y + textOffsetY; })
// 		  .attr("height", dragRect)
// 		  .attr("width", dragBoxWidth)
// 		  .attr("fill-opacity", 1.0)
// 		  .attr("fill", "white")
// 		  .attr("font-size", 12)
// 		  .attr("font-family", " 'Titillium Web', sans-serif")
// 		  .attr("cursor", "move")
// 		  .attr("visibility", "visible")
// 		  .text(unminimizedTitleBarText)
// 		  .call(drag);				  

// 	dragBarLeft = newg.append("rect")
// 		  .attr("x", function(d) { return d.x - (dragBarw/2); })
// 		  .attr("y", function(d) { return d.y + (dragBarw/2); })
// 		  .attr("height", dragBoxHeight - dragBarw)
// 		  .attr("id", "dragLeft")
// 		  .attr("width", dragBarw)
// 		  .attr("fill-opacity", 0)
// 		  .attr("cursor", "ew-resize")
// 		  .call(dragLeft);

// 	dragBarRight = newg.append("rect")
// 		  .attr("x", function(d) { return d.x + dragBoxWidth - (dragBarw/2); })
// 		  .attr("y", function(d) { return d.y + (dragBarw/2); })
// 		  .attr("id", "dragRight")
// 		  .attr("height", dragBoxHeight - dragBarw)
// 		  .attr("width", dragBarw)
// 		  .attr("fill-opacity", 0)
// 		  .attr("cursor", "ew-resize")
// 		  .call(dragRight);

// 	dragBarTop = newg.append("rect")
// 		  .attr("x", function(d) { return d.x + 1; })
// 		  .attr("y", function(d) { return d.y; })
// 		  .attr("height", dragBarw)
// 		  .attr("id", "dragTop")
// 		  .attr("width", dragBoxWidth-2)
// 		  .attr("fill", "#FFFFFF")
// 		  .attr("fill-opacity", 0.5)
// 		  .attr("stroke", "white")
// 		  .attr("font-size", 14)
// 		  .attr("font-family", "Verdana")
// 		  .attr("cursor", "pointer")
// 		  .call(drag);

// 	dragBarBottom = newg.append("rect")
// 		  .attr("x", function(d) { return d.x + (dragBarw/2); })
// 		  .attr("y", function(d) { return d.y + dragBoxHeight - (dragBarw/2); })
// 		  .attr("id", "dragBottom")
// 		  .attr("height", dragBarw)
// 		  .attr("width", dragBoxWidth - dragBarw)
// 		  .attr("fill-opacity", 0)
// 		  .attr("cursor", "ns-resize")
// 		  .call(dragBottom);
		  
// 	dragBarTop.on("click", toggleMinimize);
// 	dragRectText.on("click", toggleMinimize);
// }

// function toggleMinimize(d)
// {
// 	isMinimized = !isMinimized;
// 	if (isMinimized)
// 	{
// 		dragRectText.attr('visibility','hidden');
// 		setDragRectTitleText(minimizedTitleBarText);
// 	}
// 	else
// 	{
// 		dragRectText.attr('visibility','visible');
// 		setDragRectTitleText(unminimizedTitleBarText);
// 	}

// 	// Switch temporarily stored heights(one will be nothing;
// 	// the other will be the default or user-set sizes)
// 	dragBoxHeightTemp = [dragBoxHeight, dragBoxHeight = dragBoxHeightTemp][0];
// 	dragBarHeightTemp = [dragBarHeight, dragBarHeight = dragBarHeightTemp][0];
// 	dragBarwTemp = [dragBarw, dragBarw = dragBarwTemp][0];
	
// 	// Redraw with new heights
// 	dragRect.attr('height', dragBoxHeight);
// 	dragRectText.attr('height', dragBoxHeight);
// 	dragBarLeft.attr('height', dragBarHeight);
// 	dragBarRight.attr('height', dragBarHeight);
// 	dragBarBottom.attr('height', dragBarw);
// 	// dragBarTop.attr('height', dragBarw);
	
// }

// function dragMove(d) {
// 	dragRect
// 	  .attr("x", d.x = Math.max(0, Math.min(mapWidth - dragBoxWidth, d3.event.x)));
// 	dragRectText
// 	  .attr("x", parseInt(dragRect.attr('x')) + textOffsetX);
// 	dragRectTitleText
// 	  .attr("x", parseInt(dragRect.attr('x')) + textOffsetX);
//     dragBarLeft 
// 	  .attr("x", function(d) { return d.x - (dragBarw/2); });
// 	dragBarRight 
// 	  .attr("x", function(d) { return d.x + dragBoxWidth - (dragBarw/2); });
// 	dragBarTop 
// 	  .attr("x", function(d) { return d.x + 1; });
// 	dragBarBottom 
// 	  .attr("x", function(d) { return d.x + (dragBarw/2); });

// 	dragRect
// 	  .attr("y", d.y = Math.max(0, Math.min(mapHeight - dragBoxHeight, d3.event.y)));
// 	dragRectText
// 	  .attr("y", parseInt(dragRect.attr('y')) + textOffsetY);	  
// 	dragRectTitleText
// 	  .attr("y", parseInt(dragRect.attr('y')) + textOffsetY);	  
//     dragBarLeft 
// 	  .attr("y", function(d) { return d.y + (dragBarw/2); });
// 	dragBarRight 
// 	  .attr("y", function(d) { return d.y + (dragBarw/2); });
// 	dragBarTop 
// 	  .attr("y", function(d) { return d.y; });
// 	dragBarBottom 
// 	  .attr("y", function(d) { return d.y + dragBoxHeight - (dragBarw/2); });
// }

// function lDragResize(d) {
// 	if (!isMinimized)
// 	{
// 	  var oldx = d.x; 
// 		 //Max x on the right is x + dragBoxWidth - dragBarw
// 		 //Max x on the left is 0 - (dragBarw/2)
// 	  d.x = Math.max(0, Math.min(d.x + dragBoxWidth - (dragBarw / 2), d3.event.x)); 
// 	  dragBoxWidth = dragBoxWidth + (oldx - d.x);
// 	  dragBarLeft
// 		.attr("x", function(d) { return d.x - (dragBarw / 2); });
	   
// 	  dragRect
// 		.attr("x", function(d) { return d.x; })
// 		.attr("width", dragBoxWidth);

// 	  dragRectText
// 		.attr("x", parseInt(dragRect.attr('x')) + textOffsetX)
// 		.attr("width", dragBoxWidth);	
		
// 	  dragRectTitleText
// 		.attr("x", parseInt(dragRect.attr('x')) + textOffsetX)
// 		.attr("width", dragBoxWidth);	
				
// 		dragBarTop 
// 			.attr("x", function(d) { return d.x + 1; })
// 			.attr("width", dragBoxWidth-2)
// 		dragBarBottom 
// 			.attr("x", function(d) { return d.x + (dragBarw/2); })
// 			.attr("width", dragBoxWidth - dragBarw)
// 	}
// }

// function rDragResize(d) {
// 	if (!isMinimized)
// 	{	
// 		 //Max x on the left is x - dragBoxWidth 
// 		 //Max x on the right is width of screen + (dragBarw/2)
// 		 var dragx = Math.max(d.x + (dragBarw/2), Math.min(mapWidth, d.x + dragBoxWidth + d3.event.dx));

// 		 //recalculate width
// 		 dragBoxWidth = dragx - d.x;

// 		 //move the right drag handle
// 		 dragBarRight
// 			.attr("x", function(d) { return dragx - (dragBarw/2) });

// 		 //resize the drag rectangle
// 		 //as we are only resizing from the right, the x coordinate does not need to change
// 		dragRect
// 			.attr("width", dragBoxWidth);
// 		dragRectText
// 			.attr("width", dragBoxWidth);
// 		dragRectTitleText
// 			.attr("width", dragBoxWidth);			
// 		dragBarTop 
// 			.attr("width", dragBoxWidth-2)
// 		dragBarBottom 
// 			.attr("width", dragBoxWidth - dragBarw)
// 	}
// }

// function tDragResize(d) {
// 	if (!isMinimized)
// 	{	
// 	  var oldy = d.y; 
// 	 //Max x on the right is x + dragBoxWidth - dragBarw
// 	 //Max x on the left is 0 - (dragBarw/2)
// 	  d.y = Math.max(0, Math.min(d.y + dragBoxHeight - (dragBarw / 2), d3.event.y)); 
// 	  dragBoxHeight = dragBoxHeight + (oldy - d.y);
// 	  dragBarTop
// 		.attr("y", function(d) { return d.y; });
	   
// 		dragRect
// 			.attr("y", function(d) { return d.y; })
// 			.attr("height", dragBoxHeight);

// 		dragRectText
// 			.attr("y", parseInt(dragRect.attr('y')) + textOffsetY)
// 			.attr("height", dragBoxHeight);
// 		dragRectTitleText
// 			.attr("y", parseInt(dragRect.attr('y')) + textOffsetY)
// 			.attr("height", dragBoxHeight);			
		
// 		dragBarLeft 
// 			.attr("y", function(d) { return d.y + (dragBarw/2); })
// 			.attr("height", dragBoxHeight - dragBarw);
// 		dragBarRight 
// 			.attr("y", function(d) { return d.y + (dragBarw/2); })
// 			.attr("height", dragBoxHeight - dragBarw);
// 	}
// }

// function bDragResize(d) {
// 	if (!isMinimized)
// 	{
// 		 //Max x on the left is x - width 
// 		 //Max x on the right is width of screen + (dragBarw/2)
// 		 var dragy = Math.max(d.y + (dragBarw/2), Math.min(mapHeight, d.y + dragBoxHeight + d3.event.dy));

// 		 //recalculate width
// 		 dragBoxHeight = dragy - d.y;

// 		 //move the right drag handle
// 		 dragBarBottom
// 			.attr("y", function(d) { return dragy - (dragBarw/2) });

// 		 //resize the drag rectangle
// 		 //as we are only resizing from the right, the x coordinate does not need to change
// 		 dragRect
// 			.attr("height", dragBoxHeight);
// 		 dragRectText
// 			.attr("height", dragBoxHeight);		
// 		 dragRectTitleText
// 			.attr("height", dragBoxHeight);					
// 		 dragBarLeft 
// 			.attr("height", dragBoxHeight - dragBarw);
// 		 dragBarRight 
// 			.attr("height", dragBoxHeight - dragBarw);
// 	}
// }

// function setDragRectText(text)
// {
// 	dragRectText.text(text);
// }

// function setDragRectTitleText(text)
// {
// 	dragRectTitleText.text(text);
// }