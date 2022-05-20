import React, { useState } from "react";
import Editor from "./components/Editor";
import { initStorage, getNotebooks } from "./utils/Storage";

export default function App() {
  React.useEffect(() => {
      initStorage();
  })
  return (
        <div style={{ width: '100%', height: '100%' }}>
            <Editor
                filename="test.md"
                value="# Test"
            />
        </div>
    );
}