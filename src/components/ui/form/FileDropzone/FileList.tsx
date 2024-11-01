import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { X } from 'lucide-react';

import ImageContainer from '@/components/ImageContainer';

type Mixed = File | string;

const FileList = ({ files, onRemove }: { files: Mixed[]; onRemove: (index: number) => void }) => {
  return (
    <div className="mt-2 flex flex-wrap gap-3">
      {files.map((file, index) =>
        typeof file === 'string' ? (
          <Tooltip title={file} key={index} arrow>
            <div>
              <ImageContainer className="size-20 rounded-[0.6rem]" src={file} alt={file}>
                <IconButton
                  size="small"
                  className="absolute right-1 top-1 size-fit bg-black/70 p-0.5 text-xs text-white hover:bg-black/50"
                  onClick={() => onRemove(index)}
                >
                  <X size={16} />
                </IconButton>
              </ImageContainer>
            </div>
          </Tooltip>
        ) : (
          <Tooltip title={file.name} key={index} arrow>
            <div>
              <ImageContainer
                className="size-20 rounded-[0.6rem]"
                src={URL.createObjectURL(file)}
                alt={file.name}
              >
                <IconButton
                  size="small"
                  className="absolute right-1 top-1 size-fit bg-black/70 p-0.5 text-xs text-white hover:bg-black/50"
                  onClick={() => onRemove(index)}
                >
                  <X size={16} />
                </IconButton>
              </ImageContainer>
            </div>
          </Tooltip>
        ),
      )}
    </div>
  );
};

export default FileList;
