'use client';
import React from 'react';
import { TextField, Box, List, ListItem, ListItemButton, ListItemText, Paper, Popper, ClickAwayListener, Button, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { getSearchBoxStyles } from './styles';
import { searchBreeds } from '../../utils/searchUtils';

interface SearchBoxProps {
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose?: () => void;
  drawerOpen: boolean;
  showCloseButton?: boolean;
  variant?: 'default' | 'header';
  placeholder?: string;
  enableBreedSearch?: boolean;
  onSelect?: (breed: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  open,
  value,
  onChange,
  onClose,
  drawerOpen,
  showCloseButton = true,
  variant = 'default',
  placeholder = 'Search...',
  enableBreedSearch = false,
  onSelect,
}) => {
  const [searchResults, setSearchResults] = React.useState<string[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const textFieldRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (enableBreedSearch && value.trim()) {
      const results = searchBreeds(value);
      setSearchResults(results);
      setAnchorEl(textFieldRef.current);
    } else {
      setSearchResults([]);
      setAnchorEl(null);
    }
  }, [value, enableBreedSearch]);

  if (!open) {
    return null;
  }

  return (
    <>
      <TextField
        ref={textFieldRef}
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={getSearchBoxStyles({ variant, drawerOpen })}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: showCloseButton && onClose ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={onClose}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
      />
      <Popper
        open={Boolean(anchorEl) && searchResults.length > 0}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{ zIndex: 1300 }}
      >
        <Paper sx={{ maxHeight: 300, overflow: 'auto', minWidth: 250 }}>
          <List dense>
            {searchResults.map((result, index) => (
              <ListItem
                key={`${result}-${index}`}
                sx={{ px: 2, py: 1, cursor: 'pointer' }}
                onClick={() => {
                  const breedSlug = result.toLowerCase().replace(/\s+/g, '-');
                  router.push(`/search/${breedSlug}`);
                  setSearchResults([]);
                  setAnchorEl(null);
                  onChange('');
                }}
              >
                <ListItemText
                  primary={result}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </>
  );
};

export default SearchBox;
