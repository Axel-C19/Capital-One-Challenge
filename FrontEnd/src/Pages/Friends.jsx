import React from "react";
import {
  Container,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import NavBar from "../Components/NavBar"; // Asumiendo que este es el path correcto a tu componente NavBar

const LeaderboardItem = ({ rank, name, progress, trend }) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar src={`/api/placeholder/40/40?text=${name.charAt(0)}`} />
    </ListItemAvatar>
    <ListItemText
      primary={name}
      secondary={`${progress}% Progress Towards Goals`}
    />
    <ListItemSecondaryAction sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body2" sx={{ mr: 1 }}>
        {rank}
      </Typography>
      {trend === "up" ? (
        <ArrowUpward color="success" />
      ) : (
        <ArrowDownward color="error" />
      )}
    </ListItemSecondaryAction>
  </ListItem>
);

const PlanetaryLeaderboard = () => {
  const leaderboardData = [
    { name: "Jesse Thomas", progress: 98, trend: "up" },
    { name: "Thisal Mathiyazhagan", progress: 92, trend: "down" },
    { name: "Helen Chuang", progress: 85, trend: "up" },
    { name: "Lura Silverman", progress: 81, trend: "up" },
    { name: "Winifred Groton", progress: 75, trend: "down" },
    { name: "Adrian Murillo", progress: 71, trend: "up" },
    { name: "Axel Caldera", progress: 60, trend: "down" },
    { name: "Rosa Fiddlebrook", progress: 60, trend: "down" },
    { name: "Lucas Tapia", progress: 58, trend: "down" },
    { name: "Diego Ferra", progress: 50, trend: "up" },
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#070B34", minHeight: "100vh" }}>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ bgcolor: "white", borderRadius: 2, p: 3 }}>
          <List>
            {leaderboardData.map((user, index) => (
              <LeaderboardItem
                key={user.name}
                rank={index + 1}
                name={user.name}
                progress={user.progress}
                trend={user.trend}
              />
            ))}
          </List>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography
              variant="button"
              sx={{ color: "#1976d2", cursor: "pointer" }}
            >
              View full leaderboard
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PlanetaryLeaderboard;
