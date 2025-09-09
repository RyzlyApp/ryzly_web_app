'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onUpload?: () => void;
  onNewFolder?: () => void;
}

export function Header({ onSearch, onUpload, onNewFolder }: HeaderProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <h1 className="text-xl font-semibold">File Manager</h1>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Input
              type="search"
              placeholder="Search files..."
              className="md:w-[300px] lg:w-[400px]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onNewFolder}
            >
              New Folder
            </Button>
            <Button
              size="sm"
              onClick={onUpload}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}