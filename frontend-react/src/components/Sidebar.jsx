
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MessageSquare,
  PanelLeftClose,
  Plus,
  MoreHorizontal,
  Trash2,
  X,
} from "lucide-react";

import Logo from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { formatRelative } from "../lib/time.js";

const STATUS_TEXT = {
  checking: "Checking backend…",
  online: "Backend connected",
  offline: "Backend offline",
};

export default function Sidebar({
  conversations,
  onNewChat,
  onCollapse,
  onNavigate,
  status,
  onDeleteConversation,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget || !onDeleteConversation || deleting) return;

    setDeleting(true);
    try {
      await onDeleteConversation(deleteTarget.session_id);
      setDeleteTarget(null);
      setOpenMenu(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <Logo />
        <button
          type="button"
          className="icon-btn sidebar-collapse"
          onClick={onCollapse}
          aria-label="Hide sidebar"
          title="Hide sidebar"
        >
          <PanelLeftClose size={18} />
        </button>
      </div>

      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={onNewChat}
      >
        <Plus size={18} /> New Chat
      </button>

      <p className="section-label">Recent conversations</p>

      <nav className="conversation-list">
        {conversations.length === 0 && (
          <p className="conversation-empty">
            Your saved chats will appear here.
          </p>
        )}

        {conversations.map((conversation) => (
          <div className="conversation-row" key={conversation.session_id}>
            <NavLink
              to={`/chat/${conversation.session_id}`}
              className="conversation-item"
              onClick={() => {
                setOpenMenu(null);
                onNavigate?.();
              }}
              title={conversation.preview}
            >
              <MessageSquare size={16} className="conversation-icon" />
              <span className="conversation-title">
                {conversation.title}
              </span>
              <span className="conversation-time">
                {formatRelative(conversation.updated_at)}
              </span>
            </NavLink>

            <button
              type="button"
              className="icon-btn conversation-menu-button"
              aria-label={`Options for ${conversation.title}`}
              title="Options"
              aria-expanded={openMenu === conversation.session_id}
              onClick={() =>
                setOpenMenu((current) =>
                  current === conversation.session_id
                    ? null
                    : conversation.session_id
                )
              }
            >
              <MoreHorizontal size={18} />
            </button>

            {openMenu === conversation.session_id && (
              <div className="conversation-menu" role="menu">
                <button
                  type="button"
                  role="menuitem"
                  className="conversation-menu-delete"
                  onClick={() => {
                    setDeleteTarget(conversation);
                    setOpenMenu(null);
                  }}
                >
                  <Trash2 size={16} />
                  Delete chat
                </button>
              </div>
            )}
          </div>
        ))}
      </nav>

      {deleteTarget && (
        <div className="delete-dialog-backdrop">
          <section
            className="delete-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
          >
            <button
              type="button"
              className="icon-btn delete-dialog-close"
              aria-label="Close confirmation"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
            >
              <X size={18} />
            </button>

            <h3 id="delete-dialog-title">Delete chat?</h3>
            <p>
              This will permanently delete "{deleteTarget.title}" and its
              messages. You can't undo this action.
            </p>

            <div className="delete-dialog-actions">
              <button
                type="button"
                className="btn"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </section>
        </div>
      )}

      <div className="sidebar-footer">
        <div className="backend-pill">
          <span className={`status-dot status-${status}`} />
          <div>
            <strong>{STATUS_TEXT[status]}</strong>
            <span>FastAPI · Groq · SQLite</span>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
}
