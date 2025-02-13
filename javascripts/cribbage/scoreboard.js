var Scoreboard = function () {
  constructor;
  var startPegGroupHolePositionOffsetBlue = [
    [21, 21],
    [21, 5],
  ];
  var startPegGroupHolePositionOffsetRed = [
    [37, 21],
    [37, 5],
  ];

  var verticalPegGroupHolePositionOffsetsBlue = [
    [21, 53],
    [21, 37],
    [21, 21],
    [21, 5],
    [21, -11],
  ];
  var verticalPegGroupHolePositionOffsetsRed = [
    [37, 53],
    [37, 37],
    [37, 21],
    [37, 5],
    [37, -11],
  ];

  var leftTurnPegGroupHolePositionOffsetsBlue = [
    [21, 39],
    [23, 21],
    [30, 0],
    [50, -10],
    [67, -12],
  ];
  var leftTurnPegGroupHolePositionOffsetsRed = [
    [37, 40],
    [38, 25],
    [42, 12],
    [54, 6],
    [70, 5],
  ];

  var horizontalPegGroupHolePositionOffsetsBlue = [
    [21, -12],
    [37, -12],
    [53, -12],
    [69, -12],
    [85, -12],
  ];
  var horizontalPegGroupHolePositionOffsetsRed = [
    [21, 5],
    [37, 5],
    [53, 5],
    [69, 5],
    [85, 5],
  ];

  var rightTurnPegGroupHolePositionOffsetsBlue = [
    [122, -14],
    [104, -12],
    [83, -4],
    [73, 16],
    [71, 32],
  ];
  var rightTurnPegGroupHolePositionOffsetsRed = [
    [122, 5],
    [108, 5],
    [95, 8],
    [88, 20],
    [87, 35],
  ];

  var verticalRightPegGroupHolePositionOffsetsBlue = [
    [71, -11],
    [71, 5],
    [71, 21],
    [71, 37],
    [71, 52],
  ];
  var verticalRightPegGroupHolePositionOffsetsRed = [
    [87, -11],
    [87, 5],
    [87, 21],
    [87, 37],
    [87, 52],
  ];

  var finishPegGroupHolePositionOffset = [76, 8];

  var pegHolePositionsBlue = [];
  var pegHolePositionsRed = [];
  var frontPegBlue;
  var backPegBlue;
  var frontPegRed;
  var backPegRed;

  var leftTurnStartPegHoleIndex = 0;
  var rightTurnStartPegHoleIndex = 0;

  var compactPegImageStartLeft = 48;

  var curScorePlayer = 0;
  var curScoreComputer = 0;

  var isCompact = false;
  this.IsCompactLayout = function () {
    return isCompact;
  };

  this.SetOpponentName = function (gameDifficulty) {
    var oppText = document.getElementById("scoreboard_pegs_score_opp_text");
    var compactOppText = document.getElementById("scoreboard_compact_opp_text");
    switch (gameDifficulty) {
      case "Easy":
        oppText.innerText = "EASY";
        compactOppText.innerText = "EASY";
        break;
      case "Standard":
        oppText.innerText = "STND";
        compactOppText.innerText = "STND";
        break;
      default:
        oppText.innerText = "PRO";
        compactOppText.innerText = "PRO";
        break;
    }
  };

  this.SetCribIndicator = function (isPlayersCrib) {
    var cribIndicator = document.getElementById(
      "scoreboard_pegs_crib_indicator_group"
    );
    var compactCribIndicator = document.getElementById(
      "scoreboard_compact_crib_indicator_group"
    );
    if (isPlayersCrib) {
      cribIndicator.style.transform = "translate(0px,-18px)";
      compactCribIndicator.style.transform = "translate(0px, 0px)";
    } else {
      cribIndicator.style.transform = "translate(0px,21px)";
      compactCribIndicator.style.transform = "translate(-50px, 0px)";
    }
  };

  this.InitializeScore = function () {
    curScoreComputer = 0;
    curScorePlayer = 0;

    var pegsScoreBoard = document.getElementById("scoreboard_pegs_score_view");
    pegsScoreBoard.style.opacity = 0;
    var compactScoreBoard = document.getElementById("scoreboard_compact");
    compactScoreBoard.style.opacity = 0;

    // Compact scoreboard
    var compactScoreTextYou = document.getElementById(
      "scoreboard_compact_you_score"
    );
    compactScoreTextYou.innerText = "0";
    var compactScoreTextOpp = document.getElementById(
      "scoreboard_compact_opp_score"
    );
    compactScoreTextOpp.innerText = "0";
    var compactScoreFillYou = document.getElementById(
      "scoreboard_compact_you_fill_bar"
    );
    compactScoreFillYou.style.width = "0px";
    var compactScoreFillOpp = document.getElementById(
      "scoreboard_compact_opp_fill_bar"
    );
    compactScoreFillOpp.style.width = "0px";
    var compactScoreYouPeg = document.getElementById(
      "scoreboard_compact_you_peg"
    );
    compactScoreYouPeg.style.left = compactPegImageStartLeft + "px";
    var compactScoreOppPeg = document.getElementById(
      "scoreboard_compact_opp_peg"
    );
    compactScoreOppPeg.style.left = compactPegImageStartLeft + "px";

    var scoreText = document.getElementById("scoreboard_pegs_score_you_points");
    scoreText.innerText = "0";
    var oppScoreText = document.getElementById(
      "scoreboard_pegs_score_opp_points"
    );
    oppScoreText.innerText = "0";

    var redPeg1 = document.getElementById("scoreboard_pegs_redpeg_1");
    var redPeg2 = document.getElementById("scoreboard_pegs_redpeg_2");
    var bluePeg1 = document.getElementById("scoreboard_pegs_bluepeg_1");
    var bluePeg2 = document.getElementById("scoreboard_pegs_bluepeg_2");

    frontPegRed = redPeg1;
    backPegRed = redPeg2;
    frontPegRed.style.transition = "0s";
    backPegRed.style.transition = "0s";
    frontPegRed.holeIndex = 1;
    backPegRed.holeIndex = 0;
    frontPegRed.style.zIndex = 0;
    backPegRed.style.zIndex = 1;
    if (pegHolePositionsRed.length > 0) {
      frontPegRed.style.transform =
        "translate(" +
        pegHolePositionsRed[1][0] +
        "px," +
        pegHolePositionsRed[1][1] +
        "px)";
      backPegRed.style.transform =
        "translate(" +
        pegHolePositionsRed[0][0] +
        "px," +
        pegHolePositionsRed[0][1] +
        "px)";
    }

    frontPegBlue = bluePeg1;
    backPegBlue = bluePeg2;
    frontPegBlue.style.transition = "0s";
    backPegBlue.style.transition = "0s";
    frontPegBlue.holeIndex = 1;
    backPegBlue.holeIndex = 0;
    frontPegBlue.style.zIndex = 2;
    backPegBlue.style.zIndex = 3;
    if (pegHolePositionsBlue.length > 0) {
      frontPegBlue.style.transform =
        "translate(" +
        pegHolePositionsBlue[1][0] +
        "px," +
        pegHolePositionsBlue[1][1] +
        "px)";
      backPegBlue.style.transform =
        "translate(" +
        pegHolePositionsBlue[0][0] +
        "px," +
        pegHolePositionsBlue[0][1] +
        "px)";
    }
  };

  this.SetScorePlayer = function (playerScore) {
    if (curScorePlayer === playerScore) {
      return;
    }
    curScorePlayer = playerScore;

    var scorePegIndex = playerScore;
    if (scorePegIndex > 121) {
      scorePegIndex = 121;
    }

    var scoreText = document.getElementById("scoreboard_pegs_score_you_points");
    scoreText.style.transition = "0.2s linear";
    scoreText.style.transform = "translate(0px,25px)";
    setTimeout(function () {
      scoreText.innerText = playerScore;
      scoreText.style.transform = "translate(0px,0px)";
    }, 205);

    backPegBlue.holeIndex = scorePegIndex + 1;
    if (pegHolePositionsBlue.length > scorePegIndex + 1) {
      backPegBlue.style.transition = "0.5s ease-in-out";
      backPegBlue.style.transform =
        "translate(" +
        pegHolePositionsBlue[scorePegIndex + 1][0] +
        "px," +
        pegHolePositionsBlue[scorePegIndex + 1][1] +
        "px)";
    }
    var temp = frontPegBlue;
    frontPegBlue = backPegBlue;
    backPegBlue = temp;
    SetCorrectPegZIndexForPlayer();

    var compactPlayerScoreText = document.getElementById(
      "scoreboard_compact_you_score"
    );
    compactPlayerScoreText.style.transition = "0.2s linear";
    compactPlayerScoreText.style.transform = "translate(0px,30px)";
    setTimeout(function () {
      compactPlayerScoreText.innerHTML = playerScore;
      compactPlayerScoreText.style.transform = "translate(0px, 0px)";
    }, 250);
    var compactPlayerScoreFill = document.getElementById(
      "scoreboard_compact_you_fill_bar"
    );
    var fillPercent = playerScore / 121.0;
    if (fillPercent > 1) {
      fillPercent = 1;
    }
    compactPlayerScoreFill.style.width = 100.0 * fillPercent + "px";
    var peg = document.getElementById("scoreboard_compact_you_peg");
    peg.style.left = compactPegImageStartLeft + fillPercent * 100.0 + "px";
  };

  this.SetScoreOpp = function (score) {
    if (curScoreComputer === score) {
      return;
    }
    curScoreComputer = score;

    var scorePegIndex = score;
    if (scorePegIndex > 121) {
      scorePegIndex = 121;
    }

    var scoreText = document.getElementById("scoreboard_pegs_score_opp_points");
    scoreText.style.transition = "0.2s linear";
    scoreText.style.transform = "translate(0px,25px)";
    setTimeout(function () {
      scoreText.innerText = score;
      scoreText.style.transform = "translate(0px,0px)";
    }, 250);

    backPegRed.holeIndex = scorePegIndex + 1;
    if (pegHolePositionsRed.length > scorePegIndex + 1) {
      backPegRed.style.transition = "0.5s ease-in-out";
      backPegRed.style.transform =
        "translate(" +
        pegHolePositionsRed[scorePegIndex + 1][0] +
        "px," +
        pegHolePositionsRed[scorePegIndex + 1][1] +
        "px)";
    }
    var temp = frontPegRed;
    frontPegRed = backPegRed;
    backPegRed = temp;
    SetCorrectPegZIndexForComputer();

    var compactOppcoreText = document.getElementById(
      "scoreboard_compact_opp_score"
    );
    compactOppcoreText.style.transition = "0.2s linear";
    compactOppcoreText.style.transform = "translate(0px,30px)";
    setTimeout(function () {
      compactOppcoreText.innerHTML = score;
      compactOppcoreText.style.transform = "translate(0px, 0px)";
    }, 250);

    var compactOppScoreFill = document.getElementById(
      "scoreboard_compact_opp_fill_bar"
    );
    var fillPercent = score / 121.0;
    if (fillPercent > 1) {
      fillPercent = 1;
    }
    compactOppScoreFill.style.width = 100.0 * fillPercent + "px";
    var peg = document.getElementById("scoreboard_compact_opp_peg");
    peg.style.left = compactPegImageStartLeft + fillPercent * 100.0 + "px";
  };

  function SetCorrectPegZIndexForPlayer() {
    if (frontPegBlue != null && backPegBlue != null) {
      if (frontPegBlue.holeIndex > rightTurnStartPegHoleIndex) {
        frontPegBlue.style.zIndex = 3;
        backPegBlue.style.zIndex = 2;
      } else {
        frontPegBlue.style.zIndex = 2;
        backPegBlue.style.zIndex = 3;
      }
    }
  }

  function SetCorrectPegZIndexForComputer() {
    if (frontPegRed != null && backPegRed != null) {
      if (frontPegRed.holeIndex < leftTurnStartPegHoleIndex) {
        frontPegRed.style.zIndex = 0;
        backPegRed.style.zIndex = 1;
      } else {
        if (frontPegRed.holeIndex > rightTurnStartPegHoleIndex) {
          frontPegRed.style.zIndex = 5;
          backPegRed.style.zIndex = 4;
        } else {
          frontPegRed.style.zIndex = 4;
          backPegRed.style.zIndex = 5;
        }
      }
    }
  }

  this.Show = function () {
    var scoreboardDiv = document.getElementById("scoreboard_pegs_score_view");
    scoreboardDiv.style.opacity = 1;

    var compactScoreboard = document.getElementById("scoreboard_compact");
    compactScoreboard.style.opacity = 1;

    if (
      frontPegRed != null &&
      backPegRed != null &&
      frontPegBlue != null &&
      backPegBlue != null
    ) {
      frontPegBlue.style.transition = "0.5s ease-in-out";
      backPegBlue.style.transition = "0.5s ease-in-out";
      frontPegRed.style.transition = "0.5s ease-in-out";
      backPegRed.style.transition = "0.5s ease-in-out";
      frontPegRed.style.opacity = 1;
      backPegRed.style.opacity = 1;
      frontPegBlue.style.opacity = 1;
      backPegBlue.style.opacity = 1;
    }
  };

  this.Hide = function () {
    var scoreboardDiv = document.getElementById("scoreboard_pegs_score_view");
    scoreboardDiv.style.opacity = 0;
    var compactScoreboard = document.getElementById("scoreboard_compact");
    compactScoreboard.style.opacity = 0;
  };

  this.RedrawView = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var leftColumn = document.getElementById("scoreboard_leftColumn");
    var topRow = document.getElementById("scoreboard_topRow");
    var rightColumn = document.getElementById("scoreboard_rightColumn");
    var pegsScoreView = document.getElementById("scoreboard_pegs_score_view");

    leftColumn.innerHTML = [];
    topRow.innerHTML = [];
    rightColumn.innerHTML = [];
    pegHolePositionsBlue = [];
    pegHolePositionsRed = [];

    var sideMargin = 58;
    var topMargin = 57;
    var bottomMarginRightSide = 32 + 80;
    var bottomMarginLeftSide = 45;
    var pegHoleSegmentLength = 76;
    var pegHoleSegmentSpacing = 10;

    var topPegGroupCount = Math.floor(
      (topRow.clientWidth - sideMargin * 2 - pegHoleSegmentSpacing) /
        (pegHoleSegmentLength + pegHoleSegmentSpacing)
    );
    if (topPegGroupCount > 22) {
      topPegGroupCount = 22;
    }
    topPegHoleSegmentSpacing =
      (topRow.clientWidth -
        sideMargin * 2 -
        topPegGroupCount * pegHoleSegmentLength) /
      (topPegGroupCount + 1);

    var rightPegGroupCount = Math.floor(
      (rightColumn.clientHeight -
        topMargin -
        bottomMarginRightSide -
        pegHoleSegmentSpacing) /
        (pegHoleSegmentLength + pegHoleSegmentSpacing)
    );
    var leftPegGroupCount = Math.floor(
      (rightColumn.clientHeight -
        topMargin -
        bottomMarginLeftSide -
        pegHoleSegmentSpacing) /
        (pegHoleSegmentLength + pegHoleSegmentSpacing)
    );

    isCompact = true;
    var compactScoreboard = document.getElementById("scoreboard_compact");
    compactScoreboard.style.visibility = "visible";
    var pegsScoreboard = document.getElementById("scoreboard_pegs");
    pegsScoreboard.style.visibility = "hidden";
  };

  this.RedrawView();
};
