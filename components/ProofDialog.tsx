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
        <Button variant="secondary">Submit proof</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mission proof</DialogTitle>
          <DialogDescription>Simulate GPS or QR check-in</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Check-in type</label>
            <div className="flex space-x-2">
              <Button variant={checkinType === 'gps' ? 'default' : 'outline'} onClick={() => setCheckinType('gps')}>
                GPS
              </Button>
              <Button variant={checkinType === 'qr' ? 'default' : 'outline'} onClick={() => setCheckinType('qr')}>
                QR code
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="notes">
              Notes
            </label>
            <Input id="notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Share your experience" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="photo">
              Photo URL
            </label>
            <Input id="photo" value={photoUrl} onChange={(event) => setPhotoUrl(event.target.value)} placeholder="Paste an image URL (optional)" />
          </div>
          <Button onClick={submitProof}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
