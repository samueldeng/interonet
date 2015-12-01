$(document).ready(function () {

    //滚动导航栏
    menuYloc();
    Switch();
    VM();
    //设置标题栏用户名
    $("#user").ready(function(){
        $.post("php/Cookie.php",
            {type:"Get"},
            function(data)
            {
                $("#user").text(data);
            });

    });
    $("#Logout").click(function(){
            $.post("php/Cookie.php",
                {type:"Del"});
    }
    );


    //根据用户设置的交换机数目，设置第三模块需要配置交换机的数目
    $("#inputSwitch").blur(function () {
        SwitchConfigure()
    });

    //设置Topology
    $("#CreateTopology").click(function () {
        CreateTopology()
    });

    //查看topology
    $("#CheckTopology").click(function () {
        $('#myModal').modal('show');
    });
    //查看交换机状态
    $("#CheckSwitchButton").click(function () {
        CheckSwitch();
    });
    $("#CheckVMButton").click(function () {
        CheckVM();
    });

});

// 导航栏滚动
function menuYloc() {
    var name = "#floatMenu";
    var menuYloc = null;
    menuYloc = parseInt($(name).css("top").substring(0, $(name).css("top").indexOf("px")));
    $(window).scroll(function () {
        var offset = menuYloc + $(document).scrollTop() + "px";
        $(name).animate({top: offset}, {duration: 500, queue: false});
    });
}

// 设置第三模块交换机数目
function SwitchConfigure() {
    var SwitchNum = parseInt($("#inputSwitch").val());
    var VMNum = parseInt($("#inputVM").val());
    var SwitchNumNow = $("#Configure").find("label").size();
    if (SwitchNum > SwitchNumNow) {
        for (var i = SwitchNumNow; i < SwitchNum; i++) {
            var row = "<div class='row' id='" + "row" + i + "'></div>";
            var br = "<br id='" + "br" + i + "' />";
            $("#Configure").append(row, br);
            var col1 = "<div  class='col-xs-2'></div>";
            var col2 = "<div id='" + "s" + i + "Col2" + "' class='col-xs-1'></div>";
            var col3 = "<div id='" + "s" + i + "Col3" + "' class='col-xs-more'></div>";
            var col4 = "<div id='" + "s" + i + "Col4" + "' class='col-xs-2'></div>"
            var rowID = "#row" + i;
            $(rowID).append(col1, col2, col3, col4);
            var label = "<label class='" + "control-label'>" + "s" + i + "</label>";
            var inputRadio1 = "<input type='radio' name='" + "OF" + i + "' value='OF1.0'/>OF1.0";
            var inputRadio2 = "<input type='radio' name='" + "OF" + i + "' value='OF1.3' checked='checked'/>OF1.3";
            var inputFile = "<input type='file' name='" + "file" + i + "'/>";
            var col2ID = "#s" + i + "Col2";
            var col3ID = "#s" + i + "Col3";
            var col4ID = "#s" + i + "Col4";
            $(col2ID).append(label);
            $(col3ID).append(inputRadio1, inputRadio2);
            $(col4ID).append(inputFile);
        }
    }
    else {
        for (i = SwitchNum; i < SwitchNumNow; i++) {
            rowID = "#row" + i;
            var brID = "#br" + i;
            $(rowID).remove();
            $(brID).remove();
        }
    }

}

// 创建交换机、主机和拓扑
function CreateTopology() {
    var myModal = $("#myModal");
    myModal.css("display", "block");
    myModal.modal();
    $("#flowchart-demo").empty();
    var SwitchNum = parseInt($("#inputSwitch").val());
    var VMNum = parseInt($("#inputVM").val());
    for (var i = 0; i < SwitchNum; i++) {
        var Switch = "<div class='window switch' id='s" + i + "' ><strong>s" + i + "</strong></div>";
        $("#flowchart-demo").append(Switch);
        var space = (800 - 60 * SwitchNum) / (SwitchNum + 1);
        var sID = "#s" + i;
        var left = 60 * i + (i + 1) * space;
        $(sID).css("left", left);
    }
    for (var j = 0; j < VMNum; j++) {
        var host = "<div class='window host' id='" + "h" + j + "'><strong>" + "v" + j + "</strong></div>";
        $("#flowchart-demo").append(host);
        space = (800 - 60 * VMNum) / (VMNum + 1);
        var hID = "#h" + j;
        left = 60 * j + (j + 1) * space;
        $(hID).css("left", left);
    }

    $("#CreateTopology").text("ReCreate Topology");


    jsPlumb.ready(function () {

      
        var connectorHoverStyle = {
                lineWidth: 4,
                strokeStyle: "#216477",
                outlineWidth: 2,
                outlineColor: "white"
            },
            endpointHoverStyle = {
                fillStyle: "#216477",
                strokeStyle: "#216477"
            },

            firstEndpoint = {
                endpoint: "Dot",
                paintStyle: {
                    strokeStyle: "#000000",  // endpoint color
                    radius: 4,
                    lineWidth: 2
                },
                isSource: true,
                isTarget: true,
                connector: ["StateMachine", {curviness: 20}],
                connectorStyle: {
                    strokeStyle: "#5c96bc",
                    lineWidth: 2,
                    outlineWidth: 4
                },
                hoverPaintStyle: endpointHoverStyle,
                connectorHoverStyle: connectorHoverStyle,
                dragOptions: {},
                overlays: [
                    ["Label", {
                        location: [0.5, 1.5],
                        label: "eth0",
                        cssClass: "endpointSourceLabel"
                    }]
                ]
            },
            secondEndpoint = {
                endpoint: "Dot",
                paintStyle: {
                    strokeStyle: "#000000",  // endpoint color
                    radius: 4,
                    lineWidth: 2
                },
                isSource: true,
                isTarget: true,
                connector: ["StateMachine", {curviness: 20}],
                connectorStyle: {
                    strokeStyle: "#5c96bc",
                    lineWidth: 2,
                    outlineWidth: 4
                },
                hoverPaintStyle: endpointHoverStyle,
                connectorHoverStyle: connectorHoverStyle,
                dragOptions: {},
                overlays: [
                    ["Label", {
                        location: [0.5, 1.5],
                        label: "eth1",
                        cssClass: "endpointSourceLabel"
                    }]
                ]
            },
            thirdEndpoint = {
                endpoint: "Dot",
                paintStyle: {
                    strokeStyle: "#000000",  // endpoint color
                    radius: 4,
                    lineWidth: 2
                },
                isSource: true,
                isTarget: true,
                connector: ["StateMachine", {curviness: 20}],
                connectorStyle: {
                    strokeStyle: "#5c96bc",
                    lineWidth: 2,
                    outlineWidth: 4
                },
                hoverPaintStyle: endpointHoverStyle,
                connectorHoverStyle: connectorHoverStyle,
                dragOptions: {},
                overlays: [
                    ["Label", {
                        location: [0.5, 1.5],
                        label: "eth2",
                        cssClass: "endpointSourceLabel"
                    }]
                ]
            },
            fourthEndpoint = {
                endpoint: "Dot",
                paintStyle: {
                    strokeStyle: "#000000",  // endpoint color
                    radius: 4,
                    lineWidth: 2
                },
                isSource: true,
                isTarget: true,
                connector: ["StateMachine", {curviness: 20}],
                connectorStyle: {
                    strokeStyle: "#5c96bc",
                    lineWidth: 2,
                    outlineWidth: 4
                },
                hoverPaintStyle: endpointHoverStyle,
                connectorHoverStyle: connectorHoverStyle,
                dragOptions: {},
                overlays: [
                    ["Label", {
                        location: [0.5, 1.5],
                        label: "eth3",
                        cssClass: "endpointSourceLabel"
                    }]
                ]
            }
        var instance = jsPlumb.getInstance({
            DragOptions: {cursor: 'pointer', zIndex: 2000},
            ConnectionOverlays: [],
            Container: "flowchart-demo"
        });

        var addSwitchEndpoints = function (toId, Anthors) {
            var Endpoints = new Array(firstEndpoint, secondEndpoint, thirdEndpoint, fourthEndpoint);
            for (var i = 0; i < Anthors.length; i++) {
                var uuid = toId + ":" + i;
                instance.addEndpoint(toId, Endpoints[i], {
                    anchor: Anthors[i], uuid: uuid
                });
            }
        };
        var addVMEndpoints = function (toId, Anthors) {
            for (var j = 0; j < Anthors.length; j++) {
                var uuid = toId + ":" + j;
                instance.addEndpoint(toId, firstEndpoint, {
                    anchor: Anthors[j], uuid: uuid
                });
            }
        };


        instance.batch(function () {
            for (var i = 0; i < SwitchNum; i++) {
                var Switch = "s" + i;
                addSwitchEndpoints(Switch, ["TopCenter", "LeftMiddle", "BottomCenter", "RightMiddle"])
            }
            for (var j = 0; j < VMNum; j++) {
                var VM = "h" + j;
                addVMEndpoints(VM, ["TopCenter"])
            }

            instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), {grid: [20, 20]});


            instance.bind("click", function (c) {
                instance.detach(c);
            });
        });

        $("#SaveChanges").click(function () {
            SaveChanges(instance);
        });
    });
}
function CheckSwitch() {
    $("#CheckSwitchModal").modal("toggle");

}
function SwitchState(data)
{
    var SwitchesUsageStatus = eval('(' + data + ')');
    var SwitchesUsageStatusLength = 0;
    for (var slength in SwitchesUsageStatus) {
        SwitchesUsageStatusLength++;
    }
    var SwitchModalBody = $("#SwitchModalBody");
    for (var i=1; i<=SwitchesUsageStatusLength; i++)
    {
        var option = "<option value='"+i+"'>"+i+"</option>";
        $("#inputSwitch").append(option);
    }
        for (var m = 0; m < SwitchesUsageStatusLength; m++) {

            var row = "<div class='row' id='rowSwitch"+m+"'></div>";
            var br ="<br/>";
            SwitchModalBody.append(row,br);
            row=$("#rowSwitch"+m);
            var label = "<div class='col-xs-1'>Switch"+m+"</div>";
            var SwitchBar ="<div class='col-xs-10'><div id='s"+m+"Div' class='timeWidth'></div></div>";
            row.append(label,SwitchBar);
            var sDivID = "#s" + m + "Div";
            $(sDivID).html("");
            for (var n = 0; n < SwitchesUsageStatus[m].length; n++) {
                var startTime = SwitchesUsageStatus[m][n].start;
                var endTime = SwitchesUsageStatus[m][n].end;
                var startPoint = parseInt((parseInt(startTime.substr(0, 2)) * 60 + parseInt(startTime.substr(3, 5))) / 2);
                var endPoint = parseInt((parseInt(endTime.substr(0, 2)) * 60 + parseInt(endTime.substr(3, 5))) / 2);
                var timeSwitchBlock = "<div class='timeBlock' id='" + "s" + m + "n" + n + "' data-toggle='tooltip' data-placement='top' title='" + startTime + "~" + endTime + "'></div>";
                $(sDivID).append(timeSwitchBlock);
                var SwitchBlockID = "#s" + m + "n" + n;
                $(SwitchBlockID).css({"left": startPoint, "width": endPoint - startPoint});
                $(SwitchBlockID).tooltip();
            }
        }
}
function CheckVM() {
    $("#CheckVMModal").modal("toggle");
}
function VMState(data)
{
    var VMsUsageStatus = eval('(' + data + ')');
    var VMsUsageStatusLength = 0;
    var VMModalBody = $("#VMModalBody");
    for (var hlength in VMsUsageStatus) {
        VMsUsageStatusLength++;
    }

    for (var j=1; j<=VMsUsageStatusLength; j++)
    {
        var option = "<option value='"+j+"'>"+j+"</option>";
        $("#inputVM").append(option);
    }
    for (var m = 0; m < VMsUsageStatusLength; m++) {
        var row = "<div class='row' id='rowVM"+m+"'></div>";
        var br ="<br/>";
        VMModalBody.append(row,br);
        row=$("#rowVM"+m);
        var label = "<div class='col-xs-1'>VM"+m+"</div>";
        var VMBar ="<div class='col-xs-10'><div id='h"+m+"Div' class='timeWidth'></div></div>";
        row.append(label,VMBar);
        for (var n = 0; n < VMsUsageStatus[m].length; n++) {
            var startTime = VMsUsageStatus[m][n].start;
            var endTime = VMsUsageStatus[m][n].end;
            var startPoint = parseInt((parseInt(startTime.substr(0, 2)) * 60 + parseInt(startTime.substr(3, 5))) / 2);
            var endPoint = parseInt((parseInt(endTime.substr(0, 2)) * 60 + parseInt(endTime.substr(3, 5))) / 2);
            var timeSwitchBlock = "<div class='timeBlock' id='" + "h" + m + "n" + n + "' data-toggle='tooltip' data-placement='top' title='" + startTime + "~" + endTime + "''></div>";
            var hDivID = "#h" + m + "Div";
            $(hDivID).append(timeSwitchBlock);
            var VMBlockID = "#h" + m + "n" + n;
            $(VMBlockID).css({"left": startPoint, "width": endPoint - startPoint});
            $(VMBlockID).tooltip();
        }

    }


}
function SaveChanges(instance)
{
    // var Topology = "{";
    // var connect = instance.getAllConnections();
    // for (var k = 0; k < connect.length; k++) {
    //     var line = connect[k].endpoints;
    //     var start, end;
    //     if (line[0].getUuid().substr(0, 1) == "h") {
    //         start = line[0].getUuid();
    //         end = line[1].getUuid();
    //     }
    //     else {
    //         start = line[1].getUuid();
    //         end = line[0].getUuid();
    //     }

    //     Topology = Topology + "\"" + start + "\":" + "\"" + end + "\"";
    //     if (k < connect.length - 1)
    //         Topology = Topology + ",";
    //     else Topology = Topology + "}";
    // }
    // document.cookie = "Topology" + " = " + Topology + ";";
    //  $("#inputTopology").val(Topology);
    var Topology = new Object;
    var connect = instance.getAllConnections();
    for(var k =0; k < connect.length; k++)
    {
        var line = connect[k].endpoints;
        var start, end;
        if (line[0].getUuid().substr(0, 1) == "h") {
            start = line[0].getUuid();
            end = line[1].getUuid();
        }
        else {
            start = line[1].getUuid();
            end = line[0].getUuid();
        }
        Topology[start] = end;

    }
    $("#inputTopology").val(JSON.stringify(Topology));
}
function Switch()
{
    $.post("php/getState.php",
        {
            type: "switch"
        },SwitchState
    );
}
function VM()
{
    $.post("php/getState.php",
        {
            type: "VM"
        },VMState);
}