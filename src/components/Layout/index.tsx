import TopBar from "@/components/TopBar";
import { Outlet } from "react-router-dom";
import HistorySidebar from "../HistorySidebar";
import { useState, useEffect } from "react";
import CloseNoticeDialog from "../Dialog/CloseNotice";
import Halo from "../Halo";
import useChatStoreAdapter from "@/hooks/useChatStoreAdapter";

const Layout = () => {
  const [noticeOpen, setNoticeOpen] = useState(false);

  //Get Chatstore for the active project's task
  const { chatStore } = useChatStoreAdapter();
  if (!chatStore) {
    console.log(chatStore);
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const handleBeforeClose = () => {
      const currentStatus = chatStore.tasks[chatStore.activeTaskId as string]?.status;
      if(["running", "pause"].includes(currentStatus)) {
        setNoticeOpen(true);
      } else {
        window.electronAPI.closeWindow(true);
      }
    };

    window.ipcRenderer.on("before-close", handleBeforeClose);

    return () => {
      window.ipcRenderer.removeAllListeners("before-close");
    };
  }, [chatStore.tasks, chatStore.activeTaskId]);

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <TopBar />
      <div className="flex-1 h-full min-h-0 overflow-hidden relative">
        <Outlet />
        <HistorySidebar />
        <CloseNoticeDialog
          onOpenChange={setNoticeOpen}
          open={noticeOpen}
        />
        <Halo />
      </div>
    </div>
  );
};

export default Layout;