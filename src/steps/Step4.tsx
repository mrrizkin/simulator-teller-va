import { ChangeEvent, FormEvent, useState } from "react";
import { useAppState, useAppDispatch } from "../context/AppContext";
import { TextInput, Label } from "../components/Input";
import axios from "axios";
import { currency, onlydigit, virtual_account } from "../helpers/masking";

const Step4 = () => {
  const [showFormDetail, setShowFormDetail] = useState(true);
  const { modeTransaksi, paymentVARequest, token, fundTransferRequest } =
    useAppState();
  const {
    next,
    back,
    setPaymentVARequest,
    setInquiryResponse,
    setPaymentVAResponse,
    setFundTransferRequest,
    setFundTransferResponse,
    setLoading,
  } = useAppDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setPaymentVARequest({
      ...paymentVARequest,
      nominalVA: onlydigit(e.currentTarget.value),
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (parseInt(paymentVARequest.nominalVA) <= 0) {
      alert("Nominal VA should be greater than 0");
      return;
    }
    if (paymentVARequest.nominalVA === "") {
      alert("Nominal VA can't be empty");
    }

    setLoading(true);
    makeRequest();
  }

  function makeRequest() {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/external/paymentVA`,
        paymentVARequest,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res: any) => {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/fundtransfer`,
            fundTransferRequest,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((response) => {
            setTimeout(() => {
              setPaymentVAResponse(res.data);
              setInquiryResponse(res.data);
              setFundTransferResponse(response.data);
              setLoading(false);
              next();
            }, 1500);
          })
          .catch((e: any) => {
            setTimeout(() => {
              setPaymentVAResponse(res.data);
              setInquiryResponse(res.data);
              alert(`Fund Transfer ${e.response.data.message}`);
              setLoading(false);
              next();
            }, 1500);
          });
      })
      .catch((e: any) => {
        setTimeout(() => {
          console.warn(e);
          alert(e.response.data.message);
          setLoading(false);
        }, 1500);
      });
  }

  function toggleFormDetail() {
    setShowFormDetail(!showFormDetail);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl w-full">
      <Label className="text-xl">[Input Nominal]</Label>
      <TextInput
        value={currency(paymentVARequest.nominalVA)}
        onChange={handleChange}
        disabled={modeTransaksi === "1"}
        className={`border-3 border-gray-500 p-2 ${
          modeTransaksi === "1" ? "opacity-50 bg-gray-700" : ""
        }`}
      />
      {showFormDetail && (
        <div className="text-gray-400 mt-4">
          <div className="flex gap-8 py-4">
            <div className="flex-1">
              <Label>[VA Number]</Label>
              <TextInput
                value={virtual_account(fundTransferRequest.nomorVA)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFundTransferRequest({
                    ...fundTransferRequest,
                    nomorVA: onlydigit(e.currentTarget.value),
                  })
                }
                className="border-3 border-gray-500 p-1"
              />
            </div>
            <div className="flex-1">
              <Label>[Fee]</Label>
              <TextInput
                value={currency(fundTransferRequest.nominal)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFundTransferRequest({
                    ...fundTransferRequest,
                    nominal: onlydigit(e.currentTarget.value),
                  })
                }
                className="border-3 border-gray-500 p-1"
              />
            </div>
          </div>
          <div className="flex gap-8 py-4">
            <div className="flex-1">
              <Label>[From Account]</Label>
              <TextInput
                value={fundTransferRequest.fromAccount}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFundTransferRequest({
                    ...fundTransferRequest,
                    fromAccount: e.currentTarget.value,
                  })
                }
                className="border-3 border-gray-500 p-1"
              />
            </div>
            <div className="flex-1">
              <Label>[Detail]</Label>
              <TextInput
                value={fundTransferRequest.keterangan}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFundTransferRequest({
                    ...fundTransferRequest,
                    keterangan: e.currentTarget.value,
                  })
                }
                className="border-3 border-gray-500 p-1"
              />
            </div>
          </div>
          <div className="flex gap-8 py-4">
            <div className="flex-1">
              <Label>[stan]</Label>
              <TextInput
                value={fundTransferRequest.stan}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFundTransferRequest({
                    ...fundTransferRequest,
                    stan: e.currentTarget.value,
                  })
                }
                className="border-3 border-gray-500 p-1"
              />
            </div>
            <div className="flex-1">
              <Label>[rrn]</Label>
              <TextInput
                value={fundTransferRequest.rrn}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFundTransferRequest({
                    ...fundTransferRequest,
                    rrn: e.currentTarget.value,
                  })
                }
                className="border-3 border-gray-500 p-1"
              />
            </div>
          </div>
        </div>
      )}
      <div className="text-xs mt-4 flex gap-x-2 items-center">
        <input
          type="checkbox"
          name="showFormDetail"
          id="showFormDetail"
          onChange={toggleFormDetail}
          checked={showFormDetail}
        />
        <label htmlFor="showFormDetail">Show Form Detail</label>
      </div>
      <button
        type="button"
        onClick={back}
        className="bg-gray-500 text-white mr-4 rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
      >
        Back
      </button>
      <input
        type="submit"
        value="Next"
        className="bg-blue-500 text-white rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
      />
    </form>
  );
};

export default Step4;
