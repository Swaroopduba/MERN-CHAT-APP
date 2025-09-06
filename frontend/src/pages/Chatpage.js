import { Box, Text } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  if (!user) {
    return (
      <Box w="100%" h="91.5vh" display="flex" alignItems="center" justifyContent="center">
        <Text fontSize="xl" fontWeight="bold">Loading chats...</Text>
      </Box>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        <MyChats fetchAgain={fetchAgain} />
        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </div>
  );
};

export default Chatpage;
