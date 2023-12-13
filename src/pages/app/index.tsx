import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { GPCContext } from "Providers/GPC_Provider";
import BooksTable from "components/app/BooksTable/BooksTable";
import { db } from "components/general/firebase-config";
import { getCookie } from "cookies-next";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";

const BookData = {
  book1: {
    author: "J.K. Rowling",
    title: "Harry Potter and the Chamber of Secrets",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book2: {
    author: "J.K. Rowling",
    title: "Harry Potter and the Prisoner of Azkaban",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book3: {
    author: "J.K. Rowling",
    title: "Harry Potter and the Goblet of Fire",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book4: {
    author: "J.K. Rowling",
    title: "Harry Potter and the Order of the Phoenix",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book5: {
    author: "J.K. Rowling",
    title: "Harry Potter and the Half-Blood Prince",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book6: {
    id: "book-6",
    author: "J.K. Rowling",
    title: "Harry Potter and the Deathly Hallows",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book7: {
    id: "book-7",
    author: "J.K. Rowling",
    title: "Harry Potter and the Philosopher's Stone",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
  book8: {
    id: "book-8",
    author: "J.K. Rowling",
    title: "Harry Potter and the Chamber of Secrets",
    copies: 2,
    available: 2,
    publication: "Bloomsbury Publishing",
  },
};

const App = ({ booksDataString }: { booksDataString: string }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [booksData, setBooksData] = useState(JSON.parse(booksDataString));
  const [qrcode, setQrcode] = useState("");
  const uid = getCookie("uid") as string;
  const [rowId, setRowId] = useState("");
  const { showBackdrop, closeBackdrop, showError } = useContext(GPCContext);

  useEffect(() => {
    if (qrcode === "") return;
    if (qrcode) setOpenDialog(true);
  }, [qrcode]);

  const handleIssueBook = async () => {
    const docRef = collection(db, "qrcodes");

    showBackdrop("Generating QR Code...");
    const docSnap = await addDoc(docRef, { bookId: rowId });
    setQrcode(docSnap.id);
    closeBackdrop();

    const unsubscribe = onSnapshot(docSnap, async (document) => {
      if (document.data()?.uid) {
        try {
          setOpenDialog(false);
          showBackdrop("Issuing Book...");
          const batch = writeBatch(db);

          await batch.commit();
        } catch (e: any) {
          showError("Please try again later.");
          console.log(e);
        }
        unsubscribe();
        closeBackdrop();
      }
    });
  };

  const trial = async () => {
    // set doc
    const historyRef = doc(db, "history", "book7");
    // append the new data to the existing data field as an array
    await setDoc(
      historyRef,
      {
        history: arrayUnion({
          uid: uid,
          username: "Anas",
          issueDate: new Date(),
          returnDate: null,
        }),
      },
      { merge: true }
    );
  };

  const handleCloseQR = async () => {
    // delete qrcode from db;
    setOpenDialog(false);
    const qrRef = doc(db, "qrcodes", qrcode);
    await deleteDoc(qrRef);
  };

  const data = [
    {
      id: "1",
      title: "Chamber of Secrets",
      author: "J.K. Rowling",
      copies: 2,
      available: 2,
      publication: "Bloomsbury Publishing",
    },
    {
      id: "2",
      title: "Prisoner of Azkaban",
      author: "J.K. Rowling",
      copies: 2,
      available: 2,
      publication: "Bloomsbury Publishing",
    },
    {
      id: "3",
      title: "Goblet of Fire",
      author: "J.K. Rowling",
      copies: 2,
      available: 2,
      publication: "Bloomsbury Publishing",
    },
    {
      id: "4",
      title: "Order of the Phoenix",
      author: "J.K. Rowling",
      copies: 2,
      available: 2,
      publication: "Bloomsbury Publishing",
    },
    {
      id: "5",
      title: "Half-Blood Prince",
      author: "J.K. Rowling",
      copies: 2,
      available: 2,
      publication: "Bloomsbury Publishing",
    },
  ];

  const dataForShelves = [
    {
      id: "1",
      title: "Chamber of Secrets",
      author: "J.K. Rowling",
      copies: 2,
      available: 2,
      publication: "Bloomsbury Publishing",
    },
    {
      id: "2",
      title: "Prisoner of Azkaban",
      author: "J.K. Rowling",
      copies: 2,
      available: 2,
      publication: "Bloomsbury Publishing",
    },
    {
      id: "3",
      title: "Goblet of Fire",
      author: "J.K. Rowling",
      copies: 2,
      available: 2,
      publication: "Bloomsbury Publishing",
    },
    {
      id: "4",
      title: "Order of the Phoenix",
      author: "J.K. Rowling",
      copies: 2,
      available: 2,
      publication: "Bloomsbury Publishing",
    },
    {
      id: "5",
      title: "Half-Blood Prince",
      author: "J.K. Rowling",
      copies: 2,
      available: 2,
      publication: "Bloomsbury Publishing",
    },
  ];

  // const sendData = ()=>{
  //   const libraryIndexedRef = collection(db, "library_indexed");

  //   showBackdrop("Sending Data...");
  //   data.map(async (book) => {
  //     console.log(book);
  //     await setDoc(doc(libraryIndexedRef), book);
  //   });
  //   closeBackdrop();
  // }

  const sendData = async () => {
    const libraryIndexedRef = doc(collection(db, "library"), "0rGxy07JvoFnSXwmbdni");

    data.map(async (book, ind) => {
      const autoID = libraryIndexedRef.id;
      await updateDoc(libraryIndexedRef, { [`book-${ind}`] : book });
    });

  };

  return (
    <>
      <BooksTable
        booksData={booksData}
        setBooksData={setBooksData}
        setQrCode={setQrcode}
        setRowId={setRowId}
        handleIssueBook={handleIssueBook}
      />

      <Button color="primary" onClick={sendData}>
        Send Data
      </Button>
      <Button color="primary" onClick={trial}>
        Test
      </Button>

      <Dialog open={openDialog} onClose={handleCloseQR}>
        <DialogTitle>Scan the QR Code</DialogTitle>
        <DialogContent>
          <QRCode value={qrcode} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQR}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // automatic wrapping in pino.destination
  const fileLogger = require("pino")("app.log");
  try {
    const booksDataString = await getDoc(doc(db, "idk", "idk"));
    // turn into array and add key as id
    const booksDataArray = Object.entries(booksDataString.data()?.books).map(
      ([key, value]) => {
        // @ts-ignore
        return { ...value, id: key };
      }
    );

    return {
      props: {
        booksDataString: JSON.stringify(booksDataArray),
        // booksDataString: "[]",
      },
    };
  } catch (e) {
    fileLogger.error(e);
    return {
      props: {
        booksDataString: "[]",
      },
    };
  }
};
