import { useState, useEffect, useRef, useMemo, useContext } from 'react';
import ReactQuill, { Quill,Range } from 'react-quill';
import 'react-quill/dist/quill.snow.css';// import styles
import { formats, tollBars } from './toolBar';
import ImageUploader from "quill-image-uploader";
import hljs from 'highlight.js'
import "highlight.js/styles/monokai-sublime.min.css";
import { useForm } from 'react-hook-form';
import ImageResize from 'quill-image-resize-module-react';
import { StateContext } from '../../context/state';
// import styles
hljs.configure({
  languages: ['typescript','javascript', 'php', 'html', 'css', 'java', 'ruby', 'python', 'rust', 'sql'],
})
const Block = Quill.import("blots/block");
Block.tagName = "DIV";
Quill.register(Block, true);
Quill.register('modules/imageResize', ImageResize);
Quill.register("modules/imageUploader", ImageUploader);

const CreatePosts = () => {
  const {isDark} = useContext(StateContext)
  const { register, handleSubmit, formState: { errors: err } } = useForm();
  const [value, setValue] = useState('');
  const [resultValue, setResultValue] = useState(null);
  const [imgFile, setImgFile] = useState<File[]>([]);
  const [typePosts, setTypePosts] = useState(null)
  const [imgUrl, setImgUrl] = useState('');
  const [isPost, setIsPost] = useState(false)
  const quillRef = useRef<ReactQuill | null>(null);
  useEffect(() => {
    // Highlight code blocks when the component mounts or updates
    if (quillRef.current) {
      const nodes = quillRef?.current?.getEditor().root.querySelectorAll('pre');

      nodes.forEach((node) => {
        hljs.highlightBlock(node);
        console.log(hljs.highlightBlock(node))
      });
    }
  }, []);

  const modules = useMemo(() => ({
    syntax: {
      highlight: (text:string) => hljs.highlightAuto(text).value,
    },
    toolbar: tollBars,
    imageUploader: {
      upload: (file:File) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64ImageSrc = reader.result;
            if (base64ImageSrc !== null) {
              // Convert base64 to file here
              const byteString = typeof base64ImageSrc === 'string' ? atob(base64ImageSrc.split(',')[1]): "";
              const mimeString = base64ImageSrc && typeof base64ImageSrc === 'string' && base64ImageSrc.split(',')[0].split(':')[1].split(';')[0];
              const arrayBuffer = byteString ? new ArrayBuffer(byteString.length) : null;
              const int8Array = arrayBuffer ? new Uint8Array(arrayBuffer) : new Uint8Array();
          
              for (let i = 0; i < byteString.length; i++) {
                int8Array[i] = byteString.charCodeAt(i);
              }
          
              const imageFile:File | false = int8Array.length !== 0 && new File([int8Array], file.name, { type: mimeString as string });
              imageFile && setImgFile((prevImgFile: File[]) => [...prevImgFile, imageFile]);
              resolve(base64ImageSrc);
            } else {
              reject('Failed to read file');
            }
          };
          reader.onerror = () => {
            reject('Failed to read file');
          };
          reader.readAsDataURL(file);
        });
      },
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize', 'Toolbar']
    }
  }), []);

  const imageHandler = () => {
    const input = document.createElement('input');
    console.log(input)
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files && input.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const range = quillRef.current?.getEditor().getSelection(true);
        range && quillRef.current?.getEditor().insertEmbed(range.index, 'image', reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };
  };
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();

      editor.keyboard.addBinding({
        key: 'l', // The key you want to bind
        shortKey: true,
        shiftKey: true,
      } as any, (range:Range) => {
        const format = range && editor.getFormat(range); // Get the current format
        if (format && format['code-block']) {
          // If the user is in a code block, remove it
          editor.format('code-block', false);
        } else {
          // If the user is not in a code block, add it
          editor.format('code-block', true);
        }
      });

      const keys = ['2', '3', '4', '5', '6', '7'];

      keys.forEach((key, index) => {
        editor.keyboard.addBinding({
          key: key,
          shortKey: true, // Whether you want to use `CMD`/`CTRL`
        }, () => {
          // What happens when the shortcut is triggered
          editor.format('header', index + 1);
        });
      });

      editor.keyboard.addBinding({
        key: '0', // The key you want to bind
        shortKey: true, // Whether you want to use `CMD`/`CTRL`
      }, () => {
        // What happens when the shortcut is triggered
        editor.format('header', false); // Remove header format
      });

      const keysSize = ['1', '2', '3', '4'];
      const sizes = ['small', false, 'large', 'huge'];
      keysSize.forEach((key, index) => {
        editor.keyboard.addBinding({
          key: key,
          shortKey: true,
          shiftKey: true,
        } as any, () => {

          editor.format('size', sizes[index]);
        });
      });

      const shortcuts:{[x:string]:{format:string,value:string}} = {
        'R': { format: 'align', value: 'right' },
        'E': { format: 'align', value: 'center' },
        'J': { format: 'align', value: 'justify' },
      };

      Object.keys(shortcuts).forEach((key) => {
        editor.keyboard.addBinding({
          key: key,
          shortKey: true,

        }, () => {

          editor.format(shortcuts[key].format, shortcuts[key].value);
        });
      });

      editor.keyboard.addBinding({
        key: 'I', // The key you want to bind
        shortKey: true, // Whether you want to use `CMD`/`CTRL`
        shiftKey: true,
      } as any, () => {
        imageHandler();
      });
    }
  }, []);
  useEffect(() => {
    if (value !== "" && imgUrl !== "") {
      const parser = new DOMParser();
      const doc:any = parser.parseFromString(value, 'text/html');

      const images = doc.getElementsByTagName('img');
      for (let i = 0; i < images.length; i++) {
        images[i].src = imgUrl[i];
      }

      setResultValue(doc.body.innerHTML);
    }
  }, [value, imgUrl])
  useEffect(() => {
    if (imgFile.length !== 0) {
      imgFile && setImgUrl(imgFile.map(e => `${import.meta.env.VITE_REACT_APP_URL_IMG}/${e.name}`).join(","))
    }
  }, [imgFile])
  //To fixed it
  const onSubmit = (data:any) => {
    resultValue === null && alert("Null")
    if (resultValue !== null) {
      setTypePosts(data.type)
      setIsPost(true);
    }
  }
  useEffect(() => {
    if (isPost === true) {
      if (imgFile.length !== 0) {
        //Upload img is here
        const data = new FormData()
        for (let i = 0; i < imgFile.length; i++) {
          data.append(`file${[i]}`, imgFile[i])
        }
        /* uploadImagePostToS3(data)
          .then(res => console.log(res))
          .catch(err => console.log(err)) */
      }
      //Upload a new posts is here
      const fetchData = async () => {
        /* const token = await handleGetToken()
        const dataPost = {
          date: new Date().toISOString().split('T')[0],
          type: typePosts,
          value: resultValue.replaceAll("'", '"')
        }
        insertPosts(token, dataPost)
          .then(res => {
            alert(res.message)
            window.location.reload();
          })
          .catch(err => console.log(err)) */
      }
      fetchData()
    }
  }, [isPost, resultValue, typePosts])
  return (
    <>
      <div className="w-full h-[800px] my-4 bg-slate-100 rounded-md">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={setValue}
          formats={formats}
          modules={modules}
          className="h-[95%] rounded-md !border-none"
        />
      </div>
      <form>
        <input className={`w-[200px] h-[40px] outline-none ${isDark === true ? 'bg-white' : 'bg-slate-700 text-white'} ${err.type ? 'border-red-500' : 'border-transparent'} border-solid border-[3px] rounded-lg`} type="text" 
        placeholder='Type posts' {...register("type", { required: true })} />
      </form>
      <button className={`w-[200px] h-[40px] bg-transparent hover:bg-blue-500 border-solid border-blue-500 border-[2px] rounded-lg 
        ${isDark === true ? 'text-white' : 'text-slate-700'} hover:text-white font-bold my-2 transition-all`}
        onClick={(e) => { e.preventDefault(); handleSubmit(onSubmit)() }}
      >
        Create Post
      </button>
      {/* <div className="ql-snow bg-slate-100"><div className="ql-editor" dangerouslySetInnerHTML={{ __html: value }} /></div> */}
    </>
  );
};

export default CreatePosts;