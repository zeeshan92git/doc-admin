import React, { useContext, useEffect } from 'react';
import { Check, Clock3, Mail, RefreshCw } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext.jsx';

const InquiryInbox = () => {
  const { aToken, inquiries, inquiriesLoading, getInquiries, updateInquiryStatus } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getInquiries();
  }, [aToken, getInquiries]);

  if (!aToken) {
    return <div className="shell section py-8"><div className="panel text-center"><p className="muted">Admin access is required.</p></div></div>;
  }

  return (
    <div className="shell section py-6 sm:py-8 reveal">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <span className="label uppercase tracking-widest text-[var(--moss)] block mb-1">Communication</span>
          <h1 className="t-h2 text-[var(--ink)]">Contact Inquiries</h1>
        </div>
        <button type="button" onClick={getInquiries} disabled={inquiriesLoading} className="btn btn-sm">
          <RefreshCw size={14} className={inquiriesLoading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {inquiriesLoading && inquiries.length === 0 ? (
          <div className="panel text-center py-12"><p className="muted">Loading inquiries…</p></div>
        ) : inquiries.length === 0 ? (
          <div className="panel text-center py-16 flex flex-col items-center gap-3">
            <Mail size={32} className="text-[var(--mist)]" />
            <h3 className="t-h3 text-[var(--ink)]">No inquiries yet</h3>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <article key={inquiry._id} className="panel p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="t-h3 text-[var(--ink)] truncate">{inquiry.subject}</h2>
                  <p className="muted text-sm mt-1 break-words">
                    {inquiry.name} · <a className="text-[var(--brick)] hover:underline font-medium" href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
                  </p>
                </div>
                <span className={`chip text-xs font-semibold ${inquiry.status === 'handled' ? 'is-on' : ''}`}>
                  {inquiry.status === 'handled' ? <Check size={14} className="mr-1 inline" /> : <Clock3 size={14} className="mr-1 inline" />}
                  {inquiry.status === 'handled' ? 'Handled' : 'New'}
                </span>
              </div>
              <p className="mt-4 break-words whitespace-pre-wrap text-sm leading-relaxed text-[var(--ink-2)] bg-[var(--bone)]/50 p-4 rounded-xl border border-[var(--rule-faint)]">
                {inquiry.message}
              </p>
              <div className="mt-4 pt-4 border-t border-[var(--rule)] flex flex-wrap items-center justify-between gap-3">
                <time className="data text-xs text-[var(--mist)]">{new Date(inquiry.createdAt).toLocaleString()}</time>
                {inquiry.status === 'new' && (
                  <button type="button" onClick={() => updateInquiryStatus(inquiry._id, 'handled')} className="btn btn-sm btn-solid">Mark as Handled</button>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default InquiryInbox;