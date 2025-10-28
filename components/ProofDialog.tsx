'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToastStore } from '@/lib/use-toast';

interface ProofDialogProps {
  missionId: string;
}

export function ProofDialog({ missionId }: ProofDialogProps) {
  const [open, setOpen] = useState(false);
  const [checkinType, setCheckinType] = useState<'gps' | 'qr'>('gps');
  const [notes, setNotes] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const addToast = useToastStore((state) => state.addToast);

  async function submitProof() {
    const response = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ missionId, checkinType, notes, proofPhotoUrl: photoUrl })
    });
    if (response.ok) {
      addToast({ title: 'Submission sent' });
      setOpen(false);
      setNotes('');
      setPhotoUrl('');
      setCheckinType('gps');
    } else {
      addToast({ title: 'Submission failed', description: 'Please try again.' });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="px-6">
          Submit proof
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-slate-900">Mission proof</DialogTitle>
          <DialogDescription className="text-slate-600">
            Simulate your check-in method and share a quick note with the CityQuest crew.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Check-in type</label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={checkinType === 'gps' ? 'default' : 'outline'}
                onClick={() => setCheckinType('gps')}
              >
                GPS
              </Button>
              <Button
                type="button"
                variant={checkinType === 'qr' ? 'default' : 'outline'}
                onClick={() => setCheckinType('qr')}
              >
                QR code
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="notes">
              Notes
            </label>
            <Input
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Share your experience"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="photo">
              Photo URL
            </label>
            <Input
              id="photo"
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
              placeholder="Paste an image URL (optional)"
            />
          </div>
          <Button className="w-full" onClick={submitProof}>
            Submit proof
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
