import React, { useContext, useEffect } from 'react';
import { Check, Clock3, Mail, RefreshCw } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext.jsx';

const InquiryInbox = () => {
  const {
    aToken,
    inquiries,
    inquiriesLoading,
    getInquiries,
    updateInquiryStatus
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getInquiries();
  }, [aToken, getInquiries]);

  if (!aToken) {
    return <main className="m-5 w-full rounded border bg-white p-6 text-sm text-gray-600">Admin access is required to view inquiries.</main>;
  }

  return (
    <main className="m-5 w-full max-w-6xl px-2">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Contact inquiries</h1>
          <p className="mt-1 text-sm text-gray-500">Review messages submitted from the patient website.</p>
        </div>
        <button
          type="button"
          onClick={getInquiries}
          disabled={inquiriesLoading}
          className="inline-flex items-center gap-2 rounded border bg-white px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 disabled:opacity-60"
        >
          <RefreshCw size={16} className={inquiriesLoading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <section className="max-h-[78vh] min-h-40 space-y-3 overflow-y-auto rounded border bg-gray-50 p-3">
        {inquiriesLoading && inquiries.length === 0 ? (
          <p className="p-5 text-center text-sm text-gray-500">Loading inquiries…</p>
        ) : inquiries.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-10 text-center text-gray-500">
            <Mail size={28} />
            <p className="font-medium">No inquiries yet</p>
            <p className="text-sm">New contact messages will appear here.</p>
          </div>
        ) : inquiries.map((inquiry) => (
          <article key={inquiry._id} className="rounded border bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="break-words font-semibold text-gray-800">{inquiry.subject}</h2>
                <p className="mt-1 text-sm text-gray-600">
                  {inquiry.name} · <a className="text-blue-700 hover:underline" href={"mailto:" + inquiry.email + "?subject=" + encodeURIComponent("Re: " + inquiry.subject)}>{inquiry.email}</a>
                </p>
              </div>
              <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${inquiry.status === 'handled' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                {inquiry.status === 'handled' ? <Check size={14} /> : <Clock3 size={14} />}
                {inquiry.status === 'handled' ? 'Handled' : 'New'}
              </span>
            </div>

            <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">{inquiry.message}</p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
              <time className="text-xs text-gray-500" dateTime={inquiry.createdAt}>
                {new Date(inquiry.createdAt).toLocaleString()}
              </time>
              {inquiry.status === 'new' && (
                <button
                  type="button"
                  onClick={() => updateInquiryStatus(inquiry._id, 'handled')}
                  className="rounded bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  Mark handled
                </button>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default InquiryInbox;
