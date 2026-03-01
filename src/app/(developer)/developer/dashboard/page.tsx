"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth-context";
import { createApiKey, revokeApiKey, listApiKeys } from "./actions";

interface ApiKey {
  id: string;
  key_name: string;
  prefix: string;
  is_active: boolean;
  created_at: string;
  last_used_at: string | null;
  revoked_at: string | null;
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [keysLoading, setKeysLoading] = useState(true);

  // Create key state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [creating, setCreating] = useState(false);

  // Show created key state
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Revoke state
  const [revokeTarget, setRevokeTarget] = useState<ApiKey | null>(null);
  const [revoking, setRevoking] = useState(false);

  const fetchKeys = useCallback(async () => {
    const result = await listApiKeys();
    if (result.keys) setKeys(result.keys);
    setKeysLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !user) router.replace("/sign-in");
  }, [loading, user, router]);

  useEffect(() => {
    if (user) fetchKeys();
  }, [user, fetchKeys]);

  const handleCreate = async () => {
    if (!newKeyName.trim()) return;
    setCreating(true);
    const result = await createApiKey(newKeyName.trim());
    setCreating(false);

    if (result.error) {
      alert(result.error);
      return;
    }

    setShowCreateModal(false);
    setNewKeyName("");
    setCreatedKey(result.key!);
    fetchKeys();
  };

  const handleRevoke = async () => {
    if (!revokeTarget) return;
    setRevoking(true);
    const result = await revokeApiKey(revokeTarget.id);
    setRevoking(false);

    if (result.error) {
      alert(result.error);
      return;
    }

    setRevokeTarget(null);
    fetchKeys();
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Developer";
  const avatarUrl =
    user.user_metadata?.avatar_url || user.user_metadata?.picture;

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={displayName}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border border-white/10"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#4374BA]/20 border border-[#4374BA]/30 flex items-center justify-center text-lg font-bold text-[#4374BA]">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome, {displayName}
              </h1>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* API Keys Section */}
        <div id="api-keys">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">API Keys</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#4374BA] hover:bg-[#4374BA]/80 rounded-lg transition-colors"
            >
              Create New Key
            </button>
          </div>

          {keysLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : keys.length === 0 ? (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-12 text-center">
              <p className="text-gray-400">
                No API keys yet. Create your first key to start using the API.
              </p>
            </div>
          ) : (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left px-6 py-3 text-gray-400 font-medium">
                        Name
                      </th>
                      <th className="text-left px-6 py-3 text-gray-400 font-medium">
                        Key
                      </th>
                      <th className="text-left px-6 py-3 text-gray-400 font-medium">
                        Created
                      </th>
                      <th className="text-left px-6 py-3 text-gray-400 font-medium">
                        Last Used
                      </th>
                      <th className="text-left px-6 py-3 text-gray-400 font-medium">
                        Status
                      </th>
                      <th className="text-right px-6 py-3 text-gray-400 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {keys.map((k) => (
                      <tr
                        key={k.id}
                        className={`border-b border-white/[0.04] last:border-0 ${
                          !k.is_active ? "opacity-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 text-white font-medium">
                          {k.key_name}
                        </td>
                        <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                          {k.prefix}...
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {new Date(k.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {k.last_used_at
                            ? new Date(k.last_used_at).toLocaleDateString()
                            : "Never"}
                        </td>
                        <td className="px-6 py-4">
                          {k.is_active ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                              Revoked
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {k.is_active && (
                            <button
                              onClick={() => setRevokeTarget(k)}
                              className="text-xs text-red-400 hover:text-red-300 transition-colors"
                            >
                              Revoke
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-[#12121f] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Create New API Key
            </h3>
            <label className="block text-sm text-gray-400 mb-2">
              Key Name
            </label>
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="e.g., Production, Development, Testing"
              className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#4374BA]/50 focus:ring-1 focus:ring-[#4374BA]/50"
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              autoFocus
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewKeyName("");
                }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newKeyName.trim() || creating}
                className="px-4 py-2 text-sm font-medium text-white bg-[#4374BA] hover:bg-[#4374BA]/80 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? "Creating..." : "Create Key"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Created Key Display Modal */}
      {createdKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg bg-[#12121f] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">
              API Key Created
            </h3>
            <p className="text-sm text-amber-400 mb-4">
              Copy this key now. You won&apos;t be able to see it again.
            </p>
            <div className="flex items-center gap-2 bg-black/40 border border-white/[0.08] rounded-lg p-3">
              <code className="flex-1 text-sm text-emerald-400 font-mono break-all select-all">
                {createdKey}
              </code>
              <button
                onClick={() => handleCopy(createdKey)}
                className="shrink-0 p-2 text-gray-400 hover:text-white transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setCreatedKey(null);
                  setCopied(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revoke Confirmation Modal */}
      {revokeTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-[#12121f] border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">Revoke Key</h3>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to revoke{" "}
              <span className="text-white font-medium">
                {revokeTarget.key_name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRevokeTarget(null)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRevoke}
                disabled={revoking}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {revoking ? "Revoking..." : "Revoke Key"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
