import { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function CreateQuiz() {

  const [category, setCategory] = useState("");
  const [questionLimit, setQuestionLimit] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [categories, setCategories] = useState([]);

  function fetchCategories() {
    fetch('https://the-trivia-api.com/api/categories')
        .then(response => response.json())
        .then(response => setCategories(response))
        .catch(err => console.error(err));   
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  };

  const handleNumberChange = (e) => {
    setQuestionLimit(e.target.value)
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value)
  };

  useEffect(() => {
    fetchCategories();
  },[]);

  return (
    <Box id="category" sx={{ marginTop: "80px" }}
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="column"
      gap="10px"
      >
      <Typography fontWeight="bold" variant="h2" fontFamily="sans-serif">Quiz</Typography>
      <Typography fontWeight="bold" variant="h6" fontFamily="sans-serif">Category:</Typography>
      <FormControl>
          <Select
            name="category-select"
            value={category}
            onChange={handleCategoryChange}
            sx={{ width: "150px"}}
            >
            {
            Object.keys(categories).map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)
            }
          </Select>
      </FormControl>
      <Typography fontWeight="bold" variant="h6" fontFamily="sans-serif">Questionlimit:</Typography>
      <FormControl>
          <Select
            name="numberofquestions-select"
            value={questionLimit}
            onChange={handleNumberChange}
            sx={{ width: "150px"}}
            >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
      </FormControl>
      <Typography fontWeight="bold" variant="h6" fontFamily="sans-serif">Difficulty:</Typography>
      <FormControl>
          <Select
            name="difficulty-select"
            value={difficulty}
            onChange={handleDifficultyChange}
            sx={{ width: "150px"}}
            >
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
          </Select>
      </FormControl>
      <Button component={Link} state={{
        category: category,
        questionLimit: questionLimit,
        difficulty: difficulty
        }} to="/quiz"
        style={{
        backgroundColor: "#CF9FFF",
        fontSize: "16px",
        fontFamily: "sans-serif",
        width:"150px"
        }} variant="contained"
        >New Quiz
      </Button>
    </Box>
  );
}

export default CreateQuiz;