/*
UTF8占位
lib - tagWND.js

function ( __MODULE__ , exports  , require , __FILE__  )
*/

// Role Check
var base = require("base");
if ( !base.FlagOn( base.GetRole() ,  base.JSRT_WINDBG ) )
{
	base.printf('[-] Not In Windbg Mode!\n');
	return 0;
}

var win32 = require("windows");
var windbg = require("windbg");

var assert = base.assert;
var isArray = base.isArray;
var isString = base.isString;
var isFunction = base.isFunction;
var isNumber = base.isNumber;
var isObject = base.isObject;
var isNull = base.isNull;
var isNullOrUndefined = base.isNullOrUndefined;
var isUndefined = base.isUndefined;
var isPointer = base.isPointer;
var Pointer = base.Pointer;
var LargeInteger2Pointer = base.LargeInteger2Pointer;

var isx64 = base.isx64;
var FlagOn = base.FlagOn;
var POINTER_SIZE = base.POINTER_SIZE;


var printf = base.printf;
var KdPrint = base.KdPrint;
var sprintf = base.sprintf;

var setchar = base.setchar;
var setuchar = base.setuchar;
var setushort = base.setushort;
var setint = base.setint;
var setuint = base.setuint;
var setlong = base.setlong;
var setulong = base.setulong;
var setpointer = base.setpointer;
var setstring = base.setstring;

var getchar = base.getchar;
var getuchar = base.getuchar;
var getushort = base.getushort;
var getint = base.getint;
var getuint = base.getuint;
var getlong = base.getlong;
var getulong = base.getulong;
var getpointer = base.getpointer;
var getstring = base.getstring;

var cast2Boolean = base.cast2Boolean;
var cast2CHAR = base.cast2CHAR;
var cast2UCHAR = base.cast2UCHAR;
var cast2SHORT = base.cast2SHORT;
var cast2USHORT = base.cast2USHORT;
var cast2INT = base.cast2INT;
var cast2UINT = base.cast2UINT;
var cast2LONG = base.cast2LONG;
var cast2ULONG = base.cast2ULONG;

// ------------------------------------------------------

// win32

const OS_UNKNOWN = win32.OS_UNKNOWN;

const OS_XP_SP0 = win32.OS_XP_SP0;		// 5.1	
const OS_XP_SP1 = win32.OS_XP_SP1;
const OS_XP_SP2 = win32.OS_XP_SP2;
const OS_XP_SP3 = win32.OS_XP_SP3;

const OS_2003_SP0 = win32.OS_2003_SP0;	// 5.2
const OS_2003_SP1 = win32.OS_2003_SP1;
const OS_2003_SP2 = win32.OS_2003_SP2;

const OS_VISTA_SP0 = win32.OS_VISTA_SP0;	// 6.0
const OS_VISTA_SP1 = win32.OS_VISTA_SP1;
const OS_VISTA_SP2 = win32.OS_VISTA_SP2;

const OS_2008_SP1 = win32.OS_2008_SP1;
const OS_2008_SP2 = win32.OS_2008_SP2;

const OS_2008_R2_SP0 = win32.OS_2008_R2_SP0; // 6.1
const OS_2008_R2_SP1 = win32.OS_2008_R2_SP1; 

const OS_7_SP0 = win32.OS_7_SP0;
const OS_7_SP1 = win32.OS_7_SP1;

const OS_2012 = win32.OS_2012;	// 6.2
const OS_8 = win32.OS_8;

const OS_2012_R2 = win32.OS_2012_R2;	 // 6.3
const OS_8DOT1 = win32.OS_8DOT1;

const OS_2016 = win32.OS_2016;	// 10.0

const OS_10TH1 = win32.OS_10TH1;
const OS_10TH2 = win32.OS_10TH2;
const OS_10RS1 = win32.OS_10RS1;

const OS_MAX = win32.OS_MAX;

//----------------------------------------------------
// windbg
var ReadVirtualChar = windbg.ReadVirtualChar;
var ReadVirtualUChar = windbg.ReadVirtualUChar;
var ReadVirtualShort = windbg.ReadVirtualShort;
var ReadVirtualUShort = windbg.ReadVirtualUShort;
var ReadVirtualUInt = windbg.ReadVirtualUInt;
var ReadVirtualLong = windbg.ReadVirtualLong;
var ReadVirtualULong = windbg.ReadVirtualULong;
var ReadVirtualPointer = windbg.ReadVirtualPointer;
var ReadVirtualFloat = windbg.ReadVirtualFloat;
var ReadVirtualDouble = windbg.ReadVirtualDouble;
var ReadVirtualStringA = windbg.ReadVirtualStringA;
var ReadVirtualStringW = windbg.ReadVirtualStringW;

var WriteVirtualChar = windbg.WriteVirtualChar;
var WriteVirtualUChar = windbg.WriteVirtualUChar;
var WriteVirtualShort = windbg.WriteVirtualShort;
var WriteVirtualUShort = windbg.WriteVirtualUShort;
var WriteVirtualInt = windbg.WriteVirtualInt;
var WriteVirtualUInt = windbg.WriteVirtualUInt
var WriteVirtualLong = windbg.WriteVirtualLong;
var WriteVirtualULong = windbg.WriteVirtualULong;
var WriteVirtualPointer = windbg.WriteVirtualPointer;
var WriteVirtualFloat = windbg.WriteVirtualFloat;
var WriteVirtualDouble = windbg.WriteVirtualDouble;
var WriteVirtualStringA = windbg.WriteVirtualStringA;
var WriteVirtualStringW = windbg.WriteVirtualStringW;

var GetSymbolAddress = windbg.GetSymbolAddress;
var GetAddressSymbol = windbg.GetAddressSymbol;

var GetFieldOffset = windbg.GetFieldOffset;

var ReloadModule = windbg.ReloadModule;
var ExecuteCommand = windbg.ExecuteCommand;

var GetSystemVersion = windbg.GetSystemVersion;
var IsPointer64Bit = windbg.IsPointer64Bit;

// --------------------------------------------------------------------
var SYSTEM_FNID_TABLE = {

FNID_FIRST : 0x029A , 
FNID_SCROLLBAR : 0x029A , 
FNID_ICONTITLE : 0x029B , 
FNID_MENU : 0x029C , 
FNID_DESKTOP : 0x029D , 
FNID_DEFWINDOWPROC : 0x029E , 
FNID_MESSAGEWND : 0x029F , 
FNID_SWITCH : 0x02A0 , 
FNID_BUTTON : 0x02A1 , 
FNID_COMBOBOX : 0x02A2 , 
FNID_COMBOLBOX : 0x02A3 , 
FNID_DIALOG : 0x02A4 , 
FNID_EDIT : 0x02A5 , 
FNID_LISTBOX : 0x02A6 , 
FNID_MDICLIENT : 0x02A7 , 
FNID_STATIC : 0x02A8 , 
FNID_IME : 0x02A9 , 
FNID_GHOST : 0x02AA , 
FNID_CALLWNDPROC : 0x02AB , 
FNID_CALLWNDPROCRET : 0x02AC , 
FNID_HKINLPCWPEXSTRUCT : 0x02AD , 
FNID_HKINLPCWPRETEXSTRUCT : 0x02AE , 
FNID_MB_DLGPROC : 0x02AF , 
FNID_MDIACTIVATEDLGPROC : 0x02B0 , 
FNID_SENDMESSAGE : 0x02B1 , 
FNID_SENDMESSAGEFF : 0x02B2 , 
FNID_SENDMESSAGEWTOOPTION : 0x02B3 , 
FNID_SENDMESSAGECALLPROC : 0x02B4 , 
FNID_BROADCASTSYSTEMMESSAGE : 0x02B5 , 
FNID_TOOLTIPS : 0x02B6 , 
FNID_SENDNOTIFYMESSAGE : 0x02B7 , 
FNID_SENDMESSAGECALLBACK : 0x02B8 , 
FNID_LAST : 0x02B9 , 
FNID_DDEML : 0x2000 , 
FNID_DESTROY : 0x4000 , 
FNID_FREED : 0x8000
};


// --------------------------------------------------------------------

function Work()
{
	var ptr_mpFnidPfn = null;
	var nFNID = 0;
	var strFNIDName = '';

	
	var fnIndex = 0;
	
	var pRoutineAddress = null;
	var strRoutineName = null;
	

	
	do
	{

		ptr_mpFnidPfn = GetSymbolAddress('win32kfull!mpFnidPfn');

		printf('===========================\n');
		printf("win32kfull!mpFnidPfn = 0x%p  \n\n" , ptr_mpFnidPfn );

		printf('|fnid|name|fnIndex|mpFnidPfn\n');
		printf('|----|----|----|----\n');
		for ( strFNIDName in SYSTEM_FNID_TABLE)
		{
			nFNID = SYSTEM_FNID_TABLE[strFNIDName];
			
			fnIndex = ( nFNID + 6 ) & 0x1F;

			pRoutineAddress = ReadVirtualPointer(ptr_mpFnidPfn , fnIndex * POINTER_SIZE );
			strRoutineName = GetAddressSymbol(pRoutineAddress);


			printf("|0x%03X|%s|0x%02X|%s\n" ,
					nFNID , 
					strFNIDName ,
					fnIndex ,
					strRoutineName 
			);
		}
		
	}while(false);
	
	return 0;
}


// tagSHAREDINFO
function main(argv)
{
	var nOSVer = 0;
	var stTargetVer = null;
	var gSharedInfo = null;	

	do
	{
		stTargetVer = GetSystemVersion();
		nOSVer = stTargetVer.OSVer;
		KdPrint("[+] Target Version is %s\n" , stTargetVer.strOSVer );
		
		KdPrint("[+] try load win32k.sys\n");
		ReloadModule("win32k.sys");
		if ( nOSVer > OS_10TH1 )
		{
			KdPrint("[+] try load win32kbase.sys\n");
			ReloadModule("win32kbase.sys");
			
			KdPrint("[+] try load win32kfull.sys\n");
			ReloadModule("win32kfull.sys");
		}
		
		Work();
		
	}while(false);
	
	return 0;
}
exports.main = main;


// --------------------------------------------------------------------