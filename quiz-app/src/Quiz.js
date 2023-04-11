import { useEffect, useState } from "react";
import { Box, Typography, Stack, List, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";

export default function Quiz() {
  const location = useLocation();

  const [category] = useState(location.state.category);
  const [questionLimit] = useState(location.state.questionLimit);
  const [difficulty] = useState(location.state.difficulty);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const allAnswers = [...incorrectAnswers, correctAnswer];
  allAnswers.sort();

  function fetchQuiz() {
    if (category.includes(" & ")) {
      fetch('https://the-trivia-api.com/api/questions?limit=1&categories='+(category.replace(" & ", "_and_"))+'&difficulty='+(difficulty)+'')
        .then(response => response.json())
        .then(response => {
          setQuizes(response)
          setCorrectAnswer(response[0].correctAnswer)
          setIncorrectAnswers(response[0].incorrectAnswers)
        })
        .catch(err => console.error(err));
    } else {
      fetch('https://the-trivia-api.com/api/questions?limit=1&categories='+(category)+'&difficulty='+(difficulty)+'')
        .then(response => response.json())
        .then(response => {
          setQuizes(response)
          setCorrectAnswer(response[0].correctAnswer)
          setIncorrectAnswers(response[0].incorrectAnswers)
        })
        .catch(err => console.error(err));
    }
  };

  function guessAnswer(event) {
    if (questionNumber === questionLimit) {
      if (event.target.value === correctAnswer){
        event.target.style.backgroundColor = "#7FFF00";
        setCorrectAnswers(correctAnswers + 1);
      } else {
        event.target.style.backgroundColor = '#FF0000';
      }
      setShowFinal(true);
    } else if (event.target.value === correctAnswer){
      event.target.style.backgroundColor = "#7FFF00";
      setCorrectAnswers(correctAnswers + 1);
      setShowButton(true);
    } else {
      event.target.style.backgroundColor = '#FF0000';
      setShowButton(true);
    }
    setDisabled(true);
  };

  function restartQuiz() {
    setQuestionNumber(1);
    setShowButton(false);
    setShowFinal(false);
    setDisabled(false);
    setCorrectAnswers(0);
    fetchQuiz();
  };

  function nextQuestion() {
      setQuestionNumber(questionNumber + 1);
      setShowButton(false);
      setDisabled(false);
      fetchQuiz();
  };

  useEffect(() => {
    fetchQuiz();
  },[]);

    return(
        <Box id="quiz" sx={{mt: "80px"}}
        alignContent="center"
        textAlign="center">
        <Box alignItems="center" justifyContent="center" display="flex" flexDirection="row" gap="10px" padding="20px">
          <Button component={Link} to="/"
            style={{
            backgroundColor: "#CF9FFF",
            fontSize: "18px",
            fontFamily: "sans-serif",
            }} variant="contained">
            <MenuIcon/>Main Menu
          </Button>
          <Button onClick={restartQuiz}
            style={{
            backgroundColor: "#CF9FFF",
            fontSize: "18px",
            fontFamily: "sans-serif",
            }} variant="contained">
            <RestartAltIcon/>Restart
          </Button>
        </Box>
        <Box id="question" alignItems="center" justifyContent="center" margin=".5rem auto" width="100px" border="5px solid #CBC3E3">
            <Typography variant="h4" fontFamily="sans-serif">{questionNumber}/{questionLimit}</Typography>
        </Box>
        <Box id='results'>
        <Stack direction="column" justifyContent="center" marginTop="20px">
            {
            quizes.map((quiz) => 
              <Typography fontWeight="bold" variant="h6" fontFamily="sans-serif">{quiz.question}</Typography>
            )}
            {
            allAnswers.map((answer) =>
              <List key={answer}>
                <Button style={{
                  backgroundColor: "#CF9FFF",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                  width: "50%"
                  }} variant="contained"
                  onClick={guessAnswer} disabled={disabled} value={answer}>
                  {answer}
                </Button>
              </List>
            )}
          </Stack>
        </Box>
        { showButton && (
        <Button onClick={nextQuestion}
            style={{
            backgroundColor: "#CBC3E3",
            fontSize: "16px",
            fontFamily: "sans-serif",
            }} variant="contained">
            Next Question<ArrowForwardIcon/>
          </Button>
        ) }
        { showFinal && (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="10px">
        <Typography variant="h6" fontFamily="sans-serif">You got {correctAnswers}/{questionLimit} questions right</Typography>
        <Button onClick={restartQuiz}
            style={{
            backgroundColor: "#CBC3E3",
            fontSize: "16px",
            fontFamily: "sans-serif",
            }} variant="contained">
            New Quiz
          </Button>
        </Box>
        ) }
        </Box>
    )
}